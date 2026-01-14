import type { ClassifiedAI } from "@/app/schemas/classified-ai.schema";
import { Skeleton } from "@/components/ui/skeleton";
import {
	formatBodyType,
	formatColour,
	formatFuelType,
	formatNumber,
	formatOdometerUnit,
	formatTransmission,
	formatUlezCompliance,
} from "@/lib/utils";
import type { Make } from "@prisma/client";
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

export type StreamableSkeletonProps = Partial<Omit<ClassifiedAI, "make">> & {
	make?: Make;
	done?: boolean;
};

export const StreamableSkeleton = (props: StreamableSkeletonProps) => {
	const {
		image,
		title,
		odoReading,
		fuelType,
		transmission,
		description,
		bodyType,
		seats,
		ulezCompliance,
		doors,
		colour,
		vrm,
		odoUnit,
		make,
		done,
	} = props;
	return (
		<div className="flex flex-col container mx-auto py-12">
			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/2 relative">
					{image ? (
						<Image
							src={image}
							alt={title || "Vehicle Image"}
							width={600}
							height={400}
							className="rounded-lg aspect-3/2 object-cover"
						/>
					) : (
						<Skeleton className="aspect-3/2 w-full bg-white/10" />
					)}
				</div>
				<div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
					<div className="flex flex-col md:flex-row items-start md:items-center">
						{make ? (
							<Image
								src={make.image}
								alt={make.name}
								width={80}
								height={64}
								className="mr-4"
							/>
						) : !done ? (
							<Skeleton className="w-20 h-16 mr-4 bg-white/10" />
						) : null}
						<div>
							{title ? (
								<h1 className="text-2xl font-bold font-heading text-white">{title}</h1>
							) : (
								<Skeleton className="h-8 w-64 mb-2 bg-white/10" />
							)}
						</div>
					</div>
					<div className="my-4 flex flex-wrap items-center gap-2">
						{odoReading && odoUnit ? (
							<span className="bg-white/5 border border-white/10 text-gray-300 text-sm font-medium px-2.5 py-0.5 rounded-md">
								{formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
							</span>
						) : !done ? (
							<Skeleton className="h-6 w-16 rounded-md bg-white/10" />
						) : null}
						{fuelType ? (
							<span className="bg-white/5 border border-white/10 text-gray-300 text-sm font-medium px-2.5 py-0.5 rounded-md">
								{formatFuelType(fuelType)}
							</span>
						) : !done ? (
							<Skeleton className="h-6 w-16 rounded-md bg-white/10" />
						) : null}
						{colour ? (
							<span className="bg-white/5 border border-white/10 text-gray-300 text-sm font-medium px-2.5 py-0.5 rounded-md">
								{formatColour(colour)}
							</span>
						) : !done ? (
							<Skeleton className="h-6 w-16 rounded-md bg-white/10" />
						) : null}
						{transmission ? (
							<span className="bg-white/5 border border-white/10 text-gray-300 text-sm font-medium px-2.5 py-0.5 rounded-md">
								{formatTransmission(transmission)}
							</span>
						) : !done ? (
							<Skeleton className="h-6 w-16 rounded-md bg-white/10" />
						) : null}
					</div>
					{description ? (
						<p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
					) : (
						<Skeleton className="h-20 w-full mb-4 bg-white/10" />
					)}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<div className="bg-white/5 border border-white/5 rounded-lg shadow-xs p-4 text-center hover:border-primary/20 transition-colors">
							{ulezCompliance === "EXEMPT" ? (
								<CheckIcon className="w-6 h-6 mx-auto text-green-400" />
							) : (
								<XIcon className="w-6 h-6 mx-auto text-red-400" />
							)}
							{ulezCompliance ? (
								<p className="text-sm font-medium mt-2 text-white/90">
									{formatUlezCompliance(ulezCompliance)}
								</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2 bg-white/10" />
							) : (
								<p className="text-sm font-medium mt-2 text-gray-500">UNKNOWN</p>
							)}
						</div>
						<div className="bg-white/5 border border-white/5 rounded-lg shadow-xs p-4 text-center hover:border-primary/20 transition-colors">
							<Fingerprint className="w-6 h-6 mx-auto text-primary/70" />
							{vrm ? (
								<p className="text-sm font-medium mt-2 text-white/90">{vrm}</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2 bg-white/10" />
							) : (
								<p className="text-sm font-medium mt-2 text-gray-500">UNKNOWN</p>
							)}
						</div>
						<div className="bg-white/5 border border-white/5 rounded-lg shadow-xs p-4 text-center hover:border-primary/20 transition-colors">
							<CarIcon className="w-6 h-6 mx-auto text-primary/70" />
							{bodyType ? (
								<p className="text-sm font-medium mt-2 text-white/90">
									{formatBodyType(bodyType)}
								</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2 bg-white/10" />
							) : (
								<p className="text-sm font-medium mt-2 text-gray-500">UNKNOWN</p>
							)}
						</div>
						<div className="bg-white/5 border border-white/5 rounded-lg shadow-xs p-4 text-center hover:border-primary/20 transition-colors">
							<FuelIcon className="w-6 h-6 mx-auto text-primary/70" />
							{fuelType ? (
								<p className="text-sm font-medium mt-2 text-white/90">
									{formatFuelType(fuelType)}
								</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2 bg-white/10" />
							) : (
								<p className="text-sm font-medium mt-2 text-gray-500">UNKNOWN</p>
							)}
						</div>
						<div className="bg-white/5 border border-white/5 rounded-lg shadow-xs p-4 text-center hover:border-primary/20 transition-colors">
							<PowerIcon className="w-6 h-6 mx-auto text-primary/70" />
							{transmission ? (
								<p className="text-sm font-medium mt-2 text-white/90">
									{formatTransmission(transmission)}
								</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2 bg-white/10" />
							) : (
								<p className="text-sm font-medium mt-2 text-gray-500">UNKNOWN</p>
							)}
						</div>
						<div className="bg-white/5 border border-white/5 rounded-lg shadow-xs p-4 text-center hover:border-primary/20 transition-colors">
							<GaugeIcon className="w-6 h-6 mx-auto text-primary/70" />
							{odoReading && odoUnit ? (
								<p className="text-sm font-medium mt-2 text-white/90">
									{formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
								</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2 bg-white/10" />
							) : (
								<p className="text-sm font-medium mt-2 text-gray-500">UNKNOWN</p>
							)}
						</div>
						<div className="bg-white/5 border border-white/5 rounded-lg shadow-xs p-4 text-center hover:border-primary/20 transition-colors">
							<UsersIcon className="w-6 h-6 mx-auto text-primary/70" />
							{seats ? (
								<p className="text-sm font-medium mt-2 text-white/90">{seats}</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2 bg-white/10" />
							) : (
								<p className="text-sm font-medium mt-2 text-gray-500">UNKNOWN</p>
							)}
						</div>
						<div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
							<CarFrontIcon className="w-6 h-6 mx-auto text-zinc-400" />
							{doors ? (
								<p className="text-sm font-medium mt-2">{doors}</p>
							) : !done ? (
								<Skeleton className="h-4 w-16 mx-auto mt-2" />
							) : (
								<p className="text-sm font-medium mt-2">UNKNOWN</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
