import { PageSchema } from "@/app/schemas/page.schema";
import { ClassifiedCard } from "@/components/inventory/classified-card";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import type { Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";

export default async function FavouritesPage(props: PageProps) {
	const searchParams = await props.searchParams;
	const validPage = PageSchema.parse(searchParams?.page);

	// get the current page
	const page = validPage ? validPage : 1;

	// calculate the offset
	const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

	const sourceId = await getSourceId();
	const favourites = await redis.get<Favourites>(sourceId ?? "");

	const classifieds = await prisma.classified.findMany({
		where: { id: { in: favourites ? favourites.ids : [] } },
		include: { images: { take: 1 } },
		skip: offset,
		take: CLASSIFIEDS_PER_PAGE,
	});

	const count = await prisma.classified.count({
		where: { id: { in: favourites ? favourites.ids : [] } },
	});

	const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

	return (
		<div className="container mx-auto px-4 py-8 min-h-[80dvh]">
			<h1 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-primary uppercase tracking-widest border-b border-white/10 pb-4">
				Your <span className="text-white">Favourite Collection</span>
			</h1>

			{classifieds.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 bg-[#0A0A0A] border border-white/10 rounded-xl">
					<p className="text-gray-400 font-light mb-4">You haven't added any vehicles to your favourites yet.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{classifieds.map((classified) => {
						return (
							<ClassifiedCard
								key={classified.id}
								classified={classified}
								favourites={favourites ? favourites.ids : []}
							/>
						);
					})}
				</div>
			)}

			<div className="mt-12 flex justify-center">
				<CustomPagination
					baseURL={routes.favourites}
					totalPages={totalPages}
					styles={{
						paginationRoot: "justify-center",
						paginationPrevious: "text-primary/70 hover:text-primary",
						paginationNext: "text-primary/70 hover:text-primary",
						paginationLinkActive: "border-primary text-primary bg-primary/10",
						paginationLink: "border-gray-500 text-gray-400 hover:text-primary hover:border-primary active:border-primary transition-all",
					}}
				/>
			</div>
		</div>
	);
}
