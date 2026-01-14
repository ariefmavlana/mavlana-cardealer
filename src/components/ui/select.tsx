import { cn } from "@/lib/utils";
import type { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	value: string;
	options: { label: string; value: string }[];
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
	selectClassName?: string;
	noDefault?: boolean;
}

export const Select = (props: SelectProps) => {
	const {
		label,
		value,
		options,
		onChange,
		className,
		selectClassName,
		noDefault = true,
		...rest
	} = props;

	return (
		<div className={cn("mt-1", className)}>
			{label && <h4 className="text-sm font-semibold text-gray-300">{label}</h4>}
			<div className="mt-1">
				<select
					onChange={onChange}
					value={value ?? ""}
					className={cn(
						selectClassName,
						"disabled:!bg-gray-800 disabled:!text-gray-500 w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:border-primary custom-select appearance-none pr-12 bg-black text-gray-100 placeholder:text-gray-500",
					)}
					{...rest}
				>
					{noDefault && <option value="" className="bg-black text-gray-300">Select</option>}
					{options.map((option) => (
						<option key={option.value} value={option.value} className="bg-black text-gray-100 py-1">
							{option.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
