import { routes } from "@/config/routes";
import { MultiStepFormEnum } from "@/config/types";
import {
	formatBodyType,
	formatColour,
	formatFuelType,
	formatNumber,
	formatOdometerUnit,
	formatPrice,
	formatTransmission,
	formatUlezCompliance,
} from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import {
	CarFrontIcon,
	CarIcon,
	CheckIcon,
	Fingerprint,
	FuelIcon,
	GaugeIcon,
	PowerIcon,
	UsersIcon,
	XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HTMLParser } from "../shared/html-parser";
import { Button } from "../ui/button";
import { ClassifiedCarousel } from "./classified-carousel";

type ClassifiedWithImagesAndMake = Prisma.ClassifiedGetPayload<{
	include: { make: true; images: true };
}>;

const features = (props: ClassifiedWithImagesAndMake) => [
	{
		id: 1,
		icon:
			props.ulezCompliance === "EXEMPT" ? (
				<CheckIcon className="w-6 h-6 mx-auto text-green-500" />
			) : (
				<XIcon className="w-6 h-6 mx-auto text-red-500" />
			),
		label: formatUlezCompliance(props.ulezCompliance),
	},
	{
		id: 2,
		icon: <Fingerprint className="w-6 h-6 mx-auto" />,
		label: props.vrm,
	},
	{
		id: 3,
		icon: <CarIcon className="w-6 h-6 mx-auto" />,
		label: formatBodyType(props.bodyType),
	},
	{
		id: 4,
		icon: <FuelIcon className="w-6 h-6 mx-auto" />,
		label: formatFuelType(props.fuelType),
	},
	{
		id: 5,
		icon: <PowerIcon className="w-6 h-6 mx-auto" />,
		label: formatTransmission(props.transmission),
	},
	{
		id: 6,
		icon: <GaugeIcon className="w-6 h-6 mx-auto" />,
		label: `${formatNumber(props.odoReading)} ${formatOdometerUnit(props.odoUnit)}`,
	},
	{
		id: 7,
		icon: <UsersIcon className="w-6 h-6 mx-auto" />,
		label: props.seats,
	},
	{
		id: 8,
		icon: <CarFrontIcon className="w-6 h-6 mx-auto" />,
		label: props.doors,
	},
];

export const ClassifiedView = (props: ClassifiedWithImagesAndMake) => {
	return (
		<div className="flex flex-col container mx-auto px-4 md:px-0 py-12 text-white min-h-screen">
			<div className="flex flex-col md:flex-row gap-8">
				<div className="md:w-1/2">
					<ClassifiedCarousel images={props.images} />
				</div>
				<div className="md:w-1/2 md:pl-8 flex flex-col h-full">
					{/* Header Section */}
					<div className="flex items-center gap-4 mb-4">
						<div className="bg-white p-1 rounded-lg">
							<Image
								src={props.make.image}
								alt={props.make.name}
								className="w-12 h-12 object-contain"
								width={120}
								height={120}
							/>
						</div>
						<div>
							<h1 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-wide text-white">
								{props.title}
							</h1>
						</div>
					</div>

					{/* Badges / Chips */}
					<div className="flex flex-wrap gap-2 mb-6">
						<span className="bg-white/10 text-white text-sm font-semibold px-3 py-1 rounded-md border border-white/20">
							{props.year}
						</span>
						<span className="bg-white/10 text-white text-sm font-semibold px-3 py-1 rounded-md border border-white/20">
							{formatNumber(props.odoReading)} {formatOdometerUnit(props.odoUnit)}
						</span>
						<span className="bg-white/10 text-white text-sm font-semibold px-3 py-1 rounded-md border border-white/20">
							{formatColour(props.colour)}
						</span>
						<span className="bg-white/10 text-white text-sm font-semibold px-3 py-1 rounded-md border border-white/20">
							{formatFuelType(props.fuelType)}
						</span>
					</div>

					{/* Description - Restored to original position */}
					{props.description && (
						<div className="mb-8">
							<div className="text-gray-200 leading-relaxed text-base font-sans">
								<HTMLParser html={props.description} />
							</div>
						</div>
					)}

					{/* Price Box */}
					<div className="text-3xl md:text-5xl font-heading font-bold text-primary w-full border border-white/20 bg-white/5 flex justify-center items-center rounded-xl py-8 mb-6 backdrop-blur-sm">
						<span className="text-sm font-sans font-normal text-gray-300 mr-4 uppercase tracking-widest mt-2">
							Offered at
						</span>
						{formatPrice({ price: props.price, currency: props.currency })}
					</div>

					{/* Action Button */}
					<Button
						className="uppercase font-bold text-lg py-6 rounded-xl w-full mb-8 bg-primary text-black hover:bg-white hover:text-black tracking-widest transition-all shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)] hover:-translate-y-1"
						size="lg"
						asChild
					>
						<Link href={routes.reserve(props.slug, MultiStepFormEnum.WELCOME)}>
							Reserve Now
						</Link>
					</Button>

					{/* Features Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
						{features(props).map(({ id, icon, label }) => (
							<div
								key={id}
								className="bg-white/5 border border-white/10 rounded-lg p-3 text-center flex items-center flex-col hover:bg-white/10 transition-colors"
							>
								<div className="text-primary mb-2">
									{icon}
								</div>
								<p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
									{label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
