"use client";
import { routes } from "@/config/routes";
import type { SidebarProps } from "@/config/types";
import { env } from "@/env";
import {
	cn,
	formatBodyType,
	formatColour,
	formatFuelType,
	formatOdometerUnit,
	formatTransmission,
	formatUlezCompliance,
} from "@/lib/utils";
import {
	BodyType,
	Colour,
	CurrencyCode,
	FuelType,
	OdoUnit,
	Transmission,
	ULEZCompliance,
} from "@prisma/client";
import { Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { type ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "../shared/search-input";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Select } from "../ui/select";
import { RangeFilter } from "./range-filters";
import { TaxonomyFilters } from "./taxonomy-filters";

interface DialogFiltersProps extends SidebarProps {
	count: number;
}

export const DialogFilters = (props: DialogFiltersProps) => {
	const { minMaxValues, searchParams, count } = props;

	const { _min, _max } = minMaxValues;
	const [open, setIsOpen] = useState(false);
	const router = useRouter();
	const [filterCount, setFilterCount] = useState(0);

	const [queryStates, setQueryStates] = useQueryStates(
		{
			make: parseAsString.withDefault(""),
			model: parseAsString.withDefault(""),
			modelVariant: parseAsString.withDefault(""),
			minYear: parseAsString.withDefault(""),
			maxYear: parseAsString.withDefault(""),
			minPrice: parseAsString.withDefault(""),
			maxPrice: parseAsString.withDefault(""),
			minReading: parseAsString.withDefault(""),
			maxReading: parseAsString.withDefault(""),
			currency: parseAsString.withDefault(""),
			odoUnit: parseAsString.withDefault(""),
			transmission: parseAsString.withDefault(""),
			fuelType: parseAsString.withDefault(""),
			bodyType: parseAsString.withDefault(""),
			colour: parseAsString.withDefault(""),
			doors: parseAsString.withDefault(""),
			seats: parseAsString.withDefault(""),
			ulezCompliance: parseAsString.withDefault(""),
		},
		{
			shallow: false,
		},
	);

	useEffect(() => {
		const filterCount = Object.entries(
			searchParams as Record<string, string>,
		).filter(([key, value]) => key !== "page" && value).length;

		setFilterCount(filterCount);
	}, [searchParams]);

	const clearFilters = () => {
		const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL);
		router.replace(url.toString());
		setFilterCount(0);
	};

	const handleChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;

		setQueryStates({
			[name]: value || null,
		});

		if (name === "make") {
			setQueryStates({
				model: null,
				modelVariant: null,
			});
		}

		router.refresh();
	};

	return (
		<Dialog open={open} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon" className="lg:hidden border-white/20 bg-black text-white hover:bg-white/10 hover:text-primary">
					<Settings2 className="w-4 h-4" />{" "}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px] h-[90vh] overflow-y-auto rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 text-white">
				<div className="space-y-6">
					<div>
						<div className="text-lg font-heading font-bold text-white flex justify-between uppercase tracking-wider">
							<DialogTitle className="text-white">Filters</DialogTitle>
						</div>
						<div className="mt-2" />
					</div>

					<SearchInput
						placeholder="Search classifieds..."
						className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400"
					/>

					<div className="space-y-4">
						<TaxonomyFilters
							searchParams={searchParams}
							handleChange={handleChange}
						/>

						<RangeFilter
							label="Year"
							minName="minYear"
							maxName="maxYear"
							defaultMin={_min.year || 1925}
							defaultMax={_max.year || new Date().getFullYear()}
							handleChange={handleChange}
							searchParams={searchParams}
						/>
						<RangeFilter
							label="Price"
							minName="minPrice"
							maxName="maxPrice"
							defaultMin={_min.price || 0}
							defaultMax={_max.price || 21474836}
							handleChange={handleChange}
							searchParams={searchParams}
							increment={1000000}
							thousandSeparator
							currency={{
								currencyCode: "GBP",
							}}
						/>
						<RangeFilter
							label="Odometer Reading"
							minName="minReading"
							maxName="maxReading"
							defaultMin={_min.odoReading || 0}
							defaultMax={_max.odoReading || 1000000}
							handleChange={handleChange}
							searchParams={searchParams}
							increment={5000}
							thousandSeparator
						/>
						<Select
							label="Currency"
							name="currency"
							value={queryStates.currency || ""}
							onChange={handleChange}
							options={Object.values(CurrencyCode).map((value) => ({
								label: value,
								value,
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
						<Select
							label="Odometer Unit"
							name="odoUnit"
							value={queryStates.odoUnit || ""}
							onChange={handleChange}
							options={Object.values(OdoUnit).map((value) => ({
								label: formatOdometerUnit(value),
								value,
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
						<Select
							label="Transmission"
							name="transmission"
							value={queryStates.transmission || ""}
							onChange={handleChange}
							options={Object.values(Transmission).map((value) => ({
								label: formatTransmission(value),
								value,
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
						<Select
							label="Fuel Type"
							name="fuelType"
							value={queryStates.fuelType || ""}
							onChange={handleChange}
							options={Object.values(FuelType).map((value) => ({
								label: formatFuelType(value),
								value,
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
						<Select
							label="Body Type"
							name="bodyType"
							value={queryStates.bodyType || ""}
							onChange={handleChange}
							options={Object.values(BodyType).map((value) => ({
								label: formatBodyType(value),
								value,
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
						<Select
							label="Colour"
							name="colour"
							value={queryStates.colour || ""}
							onChange={handleChange}
							options={Object.values(Colour).map((value) => ({
								label: formatColour(value),
								value,
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
						<Select
							label="ULEZ Compliance"
							name="ulezCompliance"
							value={queryStates.ulezCompliance || ""}
							onChange={handleChange}
							options={Object.values(ULEZCompliance).map((value) => ({
								label: formatUlezCompliance(value),
								value,
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>

						<Select
							label="Doors"
							name="doors"
							value={queryStates.doors || ""}
							onChange={handleChange}
							options={Array.from({ length: 6 }).map((_, i) => ({
								label: Number(i + 1).toString(),
								value: Number(i + 1).toString(),
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
						<Select
							label="Seats"
							name="seats"
							value={queryStates.seats || ""}
							onChange={handleChange}
							options={Array.from({ length: 8 }).map((_, i) => ({
								label: Number(i + 1).toString(),
								value: Number(i + 1).toString(),
							}))}
							selectClassName="text-white bg-black/60 border-white/20 focus:border-primary backdrop-blur-sm"
						/>
					</div>

					<div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
						<Button
							type="button"
							onClick={() => setIsOpen(false)}
							className="w-full bg-primary text-black hover:bg-white hover:text-black font-bold uppercase tracking-wide"
						>
							Show Results{count > 0 ? ` (${count})` : null}
						</Button>

						{filterCount > 0 && (
							<Button
								type="button"
								variant="ghost"
								onClick={clearFilters}
								aria-disabled={!filterCount}
								className={cn(
									"text-sm py-1 text-gray-400 hover:text-white hover:bg-transparent",
									!filterCount
										? "disabled opacity-50 pointer-events-none cursor-default"
										: "hover:underline cursor-pointer",
								)}
							>
								Reset Filters {filterCount ? `(${filterCount})` : null}
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
