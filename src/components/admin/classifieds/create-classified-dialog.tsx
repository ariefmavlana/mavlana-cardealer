"use client";

import type { AI } from "@/app/_actions/ai";
import { createClassifiedAction } from "@/app/_actions/classified";
import { ClassifiedAISchema } from "@/app/schemas/classified-ai.schema";
import {
	SingleImageSchema,
	type SingleImageType,
} from "@/app/schemas/images.schema";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { readStreamableValue, useActions, useUIState } from "ai/rsc";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ImageUploader } from "./single-image-uploader";
import type { StreamableSkeletonProps } from "./streamable-skeleton";

export const CreateClassifiedDialog = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUploading, startUploadTransition] = useTransition();
	const [isCreating, startCreateTransition] = useTransition();
	const { generateClassified } = useActions<typeof AI>();
	const [messages, setMessages] = useUIState<typeof AI>();

	const imageForm = useForm<SingleImageType>({
		resolver: zodResolver(SingleImageSchema),
	});

	const createForm = useForm<StreamableSkeletonProps>({
		resolver: zodResolver(
			ClassifiedAISchema.extend({
				make: z.object({
					id: z.number().int(),
					name: z.string(),
					image: z.string(),
					createdAt: z.date(),
					updatedAt: z.date(),
				}),
			}),
		),
	});

	const handleImageUpload = (url: string) => {
		imageForm.setValue("image", url);
	};

	const onImageSubmit: SubmitHandler<SingleImageType> = (data) => {
		startUploadTransition(async () => {
			const responseMessage = await generateClassified(data.image);
			if (!responseMessage) return;
			setMessages((currentMessages) => [...currentMessages, responseMessage]);
			for await (const value of readStreamableValue(
				responseMessage.classified,
			)) {
				if (value) createForm.reset(value);
			}
		});
	};

	const onCreateSubmit: SubmitHandler<StreamableSkeletonProps> = (data) => {
		startCreateTransition(async () => {
			setMessages([]);
			const { success, message } = await createClassifiedAction(data);

			if (!success) {
				toast({
					title: "Error",
					description: message,
					type: "background",
					duration: 2500,
					variant: "destructive",
				});

				return;
			}
		});
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogTrigger asChild>
				<Button className="ml-4 tracking-wider uppercase font-bold" size="sm">
					Create New
				</Button>
			</DialogTrigger>
			<DialogContent className={cn("max-w-6xl bg-[#0A0A0A] border-white/10 text-white shadow-2xl backdrop-blur-xl")}>
				<DialogHeader>
					<DialogTitle className="font-heading text-2xl text-white uppercase tracking-wider">Create New Classified</DialogTitle>
					<DialogDescription className="text-gray-400">
						Upload an image of the vehicle to automatically generate details.
					</DialogDescription>
				</DialogHeader>
				{messages.length ? (
					<Form {...createForm}>
						<form
							className="space-y-4"
							onSubmit={createForm.handleSubmit(onCreateSubmit)}
						>
							{messages.map((message) => (
								<div className="w-full" key={message.id}>
									{message.display}
								</div>
							))}
							<div className="flex justify-between gap-2 border-t border-white/10 pt-4 mt-6">
								<Button
									variant="outline"
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
								>
									Cancel
								</Button>
								<Button
									disabled={isCreating || isUploading}
									type="submit"
									className="flex items-center gap-x-2 font-bold uppercase tracking-wider"
								>
									{isCreating || isUploading ? (
										<Loader2 className="animate-spin h-4 w-4" />
									) : null}
									{isUploading ? "Uploading..." : "Create"}
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<Form {...imageForm}>
						<form
							className="space-y-4"
							onSubmit={imageForm.handleSubmit(onImageSubmit)}
						>
							<ImageUploader onUploadComplete={handleImageUpload} />
							<div className="flex justify-between gap-2 border-t border-white/10 pt-4 mt-6">
								<Button
									variant="outline"
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
								>
									Cancel
								</Button>
								<Button
									disabled={isUploading}
									type="submit"
									className="flex items-center gap-x-2 font-bold uppercase tracking-wider"
								>
									{isUploading && <Loader2 className="animate-spin h-4 w-4" />}
									Upload & Generate
								</Button>
							</div>
						</form>
					</Form>
				)}
			</DialogContent>
		</Dialog>
	);
};
