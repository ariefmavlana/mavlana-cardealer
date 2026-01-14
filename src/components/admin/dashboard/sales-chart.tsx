"use client";

import type { ChartDataType } from "@/app/admin/dashboard/page";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { use } from "react";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	type TooltipProps,
	XAxis,
	YAxis,
} from "recharts";

interface SalesChartProps {
	data: ChartDataType;
}

export const SalesChart = (props: SalesChartProps) => {
	const { data } = props;

	const chartData = use(data);

	return (
		<Card className="mb-6 bg-[#0A0A0A] border-white/10 shadow-lg">
			<CardHeader>
				<CardTitle className="text-xl font-heading text-primary">
					Monthly Sales {new Date().getFullYear() - 1}/
					{new Date().getFullYear()}
				</CardTitle>
				<CardDescription className="text-gray-500">
					Number of cars sold per month
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={500}>
					<BarChart data={chartData}>
						<XAxis
							dataKey="month"
							stroke="#444"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							className="text-gray-500"
						/>
						<YAxis
							stroke="#444"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) =>
								formatPrice({ price: value, currency: "GBP" })
							}
							className="text-gray-500"
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ fill: "rgba(255,255,255,0.05)" }}
						/>
						<Bar
							dataKey="sales"
							fill="#D4AF37"
							radius={[4, 4, 0, 0]}
							className="hover:opacity-80 transition-opacity"
						/>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

const CustomTooltip = ({
	active,
	payload,
	label,
}: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-black/90 border border-primary/30 p-3 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm">
				<p className="text-primary font-bold mb-1">{label}</p>
				<p className="text-white text-lg">
					{formatPrice({ price: payload[0].value as number, currency: "GBP" })}
				</p>
			</div>
		);
	}
};
