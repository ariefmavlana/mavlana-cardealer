"use server";

import {
	StreamableSkeleton,
	type StreamableSkeletonProps,
} from "@/components/admin/classifieds/streamable-skeleton";
import { env } from "@/env";
import { mapToTaxonomyOrCreate } from "@/lib/ai-utils";
import { prisma } from "@/lib/prisma";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { type CoreMessage, type UserContent, generateObject } from "ai";
import {
	type StreamableValue,
	createAI,
	createStreamableUI,
	createStreamableValue,
} from "ai/rsc";
import type { ReactNode } from "react";
import {
	ClassifiedDetailsAISchema,
	ClassifiedTaxonomyAISchema,
} from "../schemas/classified-ai.schema";

const google = createGoogleGenerativeAI({
	apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function generateClassified(
	image: string,
): Promise<ClientMessage | null> {
	const uiStream = createStreamableUI();
	const valueStream = createStreamableValue<StreamableSkeletonProps>();

	let classified = { image } as StreamableSkeletonProps;

	uiStream.update(<StreamableSkeleton {...classified} />);

	async function processEvents() {
		try {
			const { object: taxonomy } = await generateObject({
				model: google("gemini-1.5-flash-latest", { structuredOutputs: true }),
				schema: ClassifiedTaxonomyAISchema,
				system:
					"You are an expert at analysing images of vehicles and responding with a structured JSON object based on the schema provided",
				messages: [
					{
						role: "user",
						content: [
							{ type: "image", image },
							{
								type: "text",
								text: "You are tasked with returning the structured data for the vehicle in the image attached.",
							},
						],
					},
				] as CoreMessage[],
			});

			classified.title =
				`${taxonomy.year} ${taxonomy.make} ${taxonomy.model} ${taxonomy.modelVariant ? ` ${taxonomy.modelVariant}` : ""}`.trim();

			const foundTaxonomy = await mapToTaxonomyOrCreate({
				year: taxonomy.year,
				make: taxonomy.make,
				model: taxonomy.model,
				modelVariant: taxonomy.modelVariant,
			});

			if (foundTaxonomy) {
				const make = await prisma.make.findFirst({
					where: { name: foundTaxonomy.make },
				});

				if (make) {
					classified = {
						...classified,
						...foundTaxonomy,
						make,
						makeId: make.id,
					};
				}
			}

			uiStream.update(<StreamableSkeleton {...classified} />);

			const { object: details } = await generateObject({
				model: google("gemini-1.5-flash-latest", { structuredOutputs: true }),
				schema: ClassifiedDetailsAISchema,
				system:
					"You are an expert at writing vehicle descriptions and generating structured data",
				messages: [
					{
						role: "user",
						content: [
							{ type: "image", image },
							{
								type: "text",
								text: `Based on the image provided, you are tasked with determining the odometer reading, doors, seats, ULEZ compliance, transmission, colour, fuel type, body type, drive type, VRM and any addition details in the schema provided for the ${classified.title}. You must be accurate when determining the values for these properties even if the image is not clear.`,
							},
						],
					},
				] as CoreMessage[],
			});

			classified = {
				...classified,
				...details,
			};

			uiStream.update(<StreamableSkeleton done={true} {...classified} />);
			valueStream.update(classified);
		} catch (error) {
			console.error("AI Generation Error:", error);
			// Fallback: Notify UI of failure but don't crash the stream completely if possible, 
			// or just log it. Since uiStream expects ReactNode, we can show an error state if needed.
			// For now, we'll just mark it done to prevent hanging.
		} finally {
			uiStream.done();
			valueStream.done();
		}
	}

	processEvents();

	return {
		id: Date.now(),
		display: uiStream.value,
		role: "assistant" as const,
		classified: valueStream.value,
	};
}

type ServerMessage = {
	id?: number;
	name?: string | undefined;
	role: "user" | "assistant" | "system";
	content: UserContent;
};

export type ClientMessage = {
	id: number;
	role: "user" | "assistant";
	display: ReactNode;
	classified: StreamableValue<StreamableSkeletonProps>;
};

export const AI = createAI({
	initialUIState: [] as ClientMessage[],
	initialAIState: [] as ServerMessage[],
	actions: {
		generateClassified,
	},
});
