import type { Favourites } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { ClassifiedStatus } from "@prisma/client";
import { LatestArrivalsCarousel } from "./latest-arrivals-carousel";

export const LatestArrivals = async () => {
	const classifieds = await prisma.classified.findMany({
		where: { status: ClassifiedStatus.LIVE },
		take: 6,
		include: { images: true },
	});

	const sourceId = await getSourceId();
	const favourites = await redis.get<Favourites>(sourceId || "");
	return (
		<section className="py-16 sm:py-24">
			<div className="container mx-auto max-w-[80vw]">
				<div className="flex items-center justify-between mb-8">
					<h2 className="uppercase text-2xl md:text-3xl font-heading font-bold tracking-widest text-white">
						Latest <span className="text-primary">Arrivals</span>
					</h2>
					<div className="h-[1px] flex-1 bg-white/10 ml-8 hidden md:block" />
				</div>
				<LatestArrivalsCarousel
					classifieds={classifieds}
					favourites={favourites ? favourites.ids : []}
				/>
			</div>
		</section>
	);
};
