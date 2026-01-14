"use client";

import { routes } from "@/config/routes";
import { type ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";
import {
	formatColour,
	formatFuelType,
	formatNumber,
	formatOdometerUnit,
	formatPrice,
	formatTransmission,
} from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HTMLParser } from "../shared/html-parser";
import { Button } from "../ui/button";
import { ImgixImage } from "../ui/imgix-image";
import { FavouriteButton } from "./favourite-button";

interface ClassifiedCardProps {
	classified: ClassifiedWithImages;
	favourites: number[];
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
	return [
		{
			id: "odoReading",
			icon: <GaugeCircle className="w-4 h-4" />,
			value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`,
		},
		{
			id: "transmission",
			icon: <Cog className="w-4 h-4" />,
			value: classified?.transmission
				? formatTransmission(classified?.transmission)
				: null,
		},
		{
			id: "fuelType",
			icon: <Fuel className="w-4 h-4" />,
			value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
		},
		{
			id: "colour",
			icon: <Paintbrush2 className="w-4 h-4" />,
			value: classified?.colour ? formatColour(classified.colour) : null,
		},
	];
};

export const ClassifiedCard = (props: ClassifiedCardProps) => {
	const { classified, favourites } = props;

	const pathname = usePathname();
	const [isFavourite, setIsFavourite] = useState(
		favourites.includes(classified.id),
	);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (!isFavourite && pathname === routes.favourites) setIsVisible(false);
	}, [isFavourite, pathname]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="group bg-[#0A0A0A] border border-white/5 relative rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)]"
				>
					<div className="aspect-[16/10] relative overflow-hidden">
						<Link href={routes.singleClassified(classified.slug)}>
							<ImgixImage
								placeholder="blur"
								blurDataURL={classified.images[0]?.blurhash}
								src={classified.images[0]?.src}
								alt={classified.images[0]?.alt}
								className="object-cover transition-transform duration-700 group-hover:scale-110"
								fill={true}
								quality={40}
							/>
						</Link>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

						<FavouriteButton
							setIsFavourite={setIsFavourite}
							isFavourite={isFavourite}
							id={classified.id}
						/>

						<div className="absolute top-3 right-3">
							<div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
								<p className="text-sm font-heading font-bold text-primary tracking-wide">
									{formatPrice({
										price: classified.price,
										currency: classified.currency,
									})}
								</p>
							</div>
						</div>
					</div>

					<div className="p-5 flex flex-col space-y-4">
						<div className="space-y-2">
							<Link
								href={routes.singleClassified(classified.slug)}
								className="block"
							>
								<h3 className="font-heading text-lg md:text-xl font-bold text-white line-clamp-1 group-hover:text-primary transition-colors tracking-wide">
									{classified.title}
								</h3>
							</Link>
							{classified?.description && (
								<div className="text-sm text-gray-300 line-clamp-2 font-light">
									<HTMLParser html={classified.description} />
								</div>
							)}
						</div>

						<div className="grid grid-cols-2 gap-y-2 gap-x-4 py-3 border-t border-white/5 border-b">
							{getKeyClassifiedInfo(classified)
								.filter((v) => v.value)
								.map(({ id, icon, value }) => (
									<div key={id} className="flex items-center gap-2 text-xs text-gray-300">
										<span className="text-primary/70">{icon}</span>
										<span className="uppercase tracking-wider opacity-90">{value}</span>
									</div>
								))}
						</div>

						<div className="flex gap-3 pt-1">
							<Button
								className="flex-1 bg-primary text-black hover:bg-white hover:text-black font-heading font-bold tracking-wider uppercase text-xs"
								asChild
								size="sm"
							>
								<Link
									href={routes.reserve(
										classified.slug,
										MultiStepFormEnum.WELCOME,
									)}
								>
									Reserve
								</Link>
							</Button>
							<Button
								className="flex-1 bg-transparent border border-primary/40 text-primary hover:bg-primary hover:text-black font-heading font-bold tracking-wider uppercase text-xs transition-colors duration-300"
								asChild
								variant="outline"
								size="sm"
							>
								<Link href={routes.singleClassified(classified.slug)}>
									Details
								</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
