import { PageSchema } from "@/app/schemas/page.schema";
import { ClassifiedsList } from "@/components/inventory/classifieds-list";
import { DialogFilters } from "@/components/inventory/dialog-filters";
import { InventorySkeleton } from "@/components/inventory/inventory-skeleton";
import { Sidebar } from "@/components/inventory/sidebar";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import type { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { ClassifiedStatus } from "@prisma/client";
import { Suspense } from "react";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
	const validPage = PageSchema.parse(searchParams?.page);

	// get the current page
	const page = validPage ? validPage : 1;

	// calculate the offset
	const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

	return prisma.classified.findMany({
		where: buildClassifiedFilterQuery(searchParams),
		include: { images: { take: 1 } },
		skip: offset,
		take: CLASSIFIEDS_PER_PAGE,
	});
};

export default async function InventoryPage(props: PageProps) {
	const searchParams = await props.searchParams;
	const classifieds = getInventory(searchParams);
	const count = await prisma.classified.count({
		where: buildClassifiedFilterQuery(searchParams),
	});

	const minMaxResult = await prisma.classified.aggregate({
		where: { status: ClassifiedStatus.LIVE },
		_min: {
			year: true,
			price: true,
			odoReading: true,
		},
		_max: {
			price: true,
			year: true,
			odoReading: true,
		},
	});

	const sourceId = await getSourceId();
	const favourites = await redis.get<Favourites>(sourceId ?? "");
	const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

	return (
		<div className="flex bg-black min-h-screen">
			<Sidebar minMaxValues={minMaxResult} searchParams={searchParams} />

			<div className="flex-1 p-6 md:p-8 bg-black">
				<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between pb-8 border-b border-white/10 mb-8">
					<div className="flex justify-between items-center w-full md:w-auto gap-4">
						<h2 className="text-sm md:text-xl font-heading font-bold text-primary uppercase tracking-wider">
							<span className="text-primary">{count}</span> Exclusive Vehicles Found
						</h2>
						<DialogFilters
							minMaxValues={minMaxResult}
							count={count}
							searchParams={searchParams}
						/>
					</div>
					<CustomPagination
						baseURL={routes.inventory}
						totalPages={totalPages}
						styles={{
							paginationRoot: "justify-end hidden lg:flex",
							paginationPrevious: "text-primary/70 hover:text-primary",
							paginationNext: "text-primary/70 hover:text-primary",
							paginationLink: "border-gray-400 text-primary/70 hover:text-primary hover:border-primary active:border-primary",
							paginationLinkActive: "border-primary text-primary bg-primary/10",
						}}
					/>
				</div>

				<Suspense fallback={<InventorySkeleton />}>
					<ClassifiedsList
						classifieds={classifieds}
						favourites={favourites ? favourites.ids : []}
					/>
				</Suspense>

				<CustomPagination
					baseURL={routes.inventory}
					totalPages={totalPages}
					styles={{
						paginationRoot: "justify-center lg:hidden pt-16 pb-8",
						paginationPrevious: "text-primary/70 hover:text-primary",
						paginationNext: "text-primary/70 hover:text-primary",
						paginationLink: "border-gray-400 text-primary/70 hover:text-primary hover:border-primary active:border-primary",
						paginationLinkActive: "border-primary text-primary",
					}}
				/>
			</div>
		</div>
	);
}
