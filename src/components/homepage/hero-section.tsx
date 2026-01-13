import { imageSources } from "@/config/constants";
import { routes } from "@/config/routes";
import type { AwaitedPageProps } from "@/config/types";
import { imgixLoader } from "@/lib/imgix-loader";
import { prisma } from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { ClassifiedStatus } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { HomepageTaxonomyFilters } from "./homepage-filters";
import { SearchButton } from "./search-button";

export const HeroSection = async (props: AwaitedPageProps) => {
	const { searchParams } = props;
	const totalFiltersApplied = Object.keys(searchParams || {}).length;
	const isFilterApplied = totalFiltersApplied > 0;

	const classifiedsCount = await prisma.classified.count({
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

	return (
		<section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
			{/* Static Background Image */}
			<div className="absolute inset-0 w-full h-full z-0">
				<div
					className="w-full h-full bg-cover bg-center"
					style={{ backgroundImage: `url(${imageSources.heroImage})` }}
				/>
				{/* Cinematic Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
			</div>

			<div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center px-4 md:px-8 py-20">
				<div className="space-y-6 text-center lg:text-left">
					<h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
						Discover the <span className="text-primary">Art</span> of <br />
						Automotive Excellence
					</h1>
					<p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-light tracking-wide">
						Experience a curated collection of the world's finest luxury vehicles.
						Designed for those who demand perfection.
					</p>
				</div>

				<div className="w-full max-w-md mx-auto">
					<div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl ring-1 ring-white/5">
						<div className="space-y-6">
							<div className="space-y-2">
								<h3 className="text-xl font-heading text-white mb-4 flex items-center gap-2">
									<span className="w-1 h-6 bg-primary rounded-full" />
									Find Your Masterpiece
								</h3>
								<HomepageTaxonomyFilters
									minMaxValues={minMaxResult}
									searchParams={searchParams}
								/>
							</div>

							<div className="pt-2">
								<SearchButton count={classifiedsCount} />
							</div>

							{isFilterApplied && (
								<Button
									asChild
									variant="ghost"
									className="w-full text-white/50 hover:text-white hover:bg-white/5 transition-colors gap-2"
								>
									<Link href={routes.home}>
										Clear Filters
										<span className="bg-white/10 px-2 py-0.5 rounded text-xs">
											{totalFiltersApplied}
										</span>
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
