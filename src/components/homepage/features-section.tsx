import { imageSources } from "@/config/constants";
import { imgixLoader } from "@/lib/imgix-loader";

export const FeaturesSection = () => {
	return (
		<div className="bg-black py-16 sm:py-24 border-t border-white/5">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl sm:text-center">
					<h2 className="text-base md:text-xl font-heading font-semibold leading-7 text-primary uppercase tracking-widest">
						We've got what you need
					</h2>
					<h2 className="mt-2 uppercase text-4xl font-heading font-bold tracking-tight text-white sm:text-7xl">
						No car? No problem
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-400 font-light max-w-2xl mx-auto">
						Our exclusive collection offers unmatched luxury and speed for the
						ultimate driving experience. Every vehicle is certified and ready for the road.
					</p>
				</div>
			</div>
			<div className="relative overflow-hidden pt-16 -mb-16 sm:-mb-24 xl:mb-0">
				<div
					className="mx-auto max-w-7xl h-[400px] bg-cover bg-center xl:rounded-t-3xl shadow-2xl border border-white/10"
					style={{
						backgroundImage: `url(${imgixLoader({ src: imageSources.featureSection, width: 1280, quality: 100 })})`,
					}}
				>
					<div className="w-full h-full bg-black/20" /> {/* Dimmer */}
				</div>
				<div aria-hidden="true" className="relative hidden xl:block">
					<div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-[5%]" />
				</div>
			</div>
		</div>
	);
};
