import type { DashboardDataType } from "@/app/admin/dashboard/page";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import {
	CarIcon,
	PoundSterling,
	TrendingUpIcon,
	UsersIcon,
} from "lucide-react";
import type React from "react";
import { use } from "react";

type KpiCardDataProps = {
	data: DashboardDataType;
};

interface DashboardItem {
	id: number;
	title: string;
	description: string;
	icon: React.ElementType;
	amount: number;
	percentage: number;
	style: Intl.NumberFormatOptions["style"];
}

export const KPICards = (props: KpiCardDataProps) => {
	const { data } = props;
	const {
		totalSales,
		carsSoldThisMonth,
		newCustomersThisMonth,
		conversionRate,
		conversionRatePercentageChange,
		salesPercentageChange,
		carsSoldPercentageChange,
		newCustomersPercentageChange,
	} = use(data);

	const dashboardData: DashboardItem[] = [
		{
			id: 1,
			title: "Total Sales",
			description: "Total sales revenue in the last 30 days",
			icon: PoundSterling,
			amount: totalSales,
			percentage: Math.round(salesPercentageChange),
			style: "currency",
		},
		{
			id: 2,
			title: "Cars Sold",
			description: "Total number of cars sold in the last 30 days",
			icon: CarIcon,
			amount: carsSoldThisMonth,
			percentage: Math.round(carsSoldPercentageChange),
			style: "decimal",
		},
		{
			id: 3,
			title: "New Customers",
			description: "Total number of new customers in the last 30 days",
			icon: UsersIcon,
			amount: newCustomersThisMonth,
			percentage: Math.round(newCustomersPercentageChange),
			style: "decimal",
		},
		{
			id: 4,
			title: "Conversion Rate",
			description: "% of sales in the last 30 days",
			icon: TrendingUpIcon,
			amount: conversionRate,
			percentage: Math.round(conversionRatePercentageChange),
			style: "percent",
		},
	];

	return (
		<div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
			{dashboardData.map((item) => (
				<KPICard key={item.id} {...item} />
			))}
		</div>
	);
};

const KPICard = (props: DashboardItem[][number]) => {
	const { icon: Icon, ...rest } = props;

	return (
		<Card key={rest.id} className="bg-[#0A0A0A] border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<div className="flex flex-col space-y-1">
					<CardTitle className="text-sm font-medium text-gray-200 uppercase tracking-wider">{rest.title}</CardTitle>
					<CardDescription className="text-gray-500 text-xs">
						{rest.description}
					</CardDescription>
				</div>
				<Icon className="h-5 w-5 text-primary" />
			</CardHeader>

			<CardContent className="flex items-center justify-between mt-2">
				<span className="text-2xl font-bold text-white font-heading">
					{rest.style === "currency"
						? formatPrice({ price: rest.amount, currency: "GBP" })
						: formatNumber(rest.amount, {
							style: rest.style,
							currency: "GBP",
							maximumFractionDigits: 0,
						})}
				</span>

				<div
					className={cn(
						"text-xs px-2 py-1 rounded-full border",
						!rest.percentage && "border-gray-800 text-gray-500",
						rest.percentage > 0
							? "bg-green-500/10 border-green-500/20 text-green-400"
							: rest.percentage < 0
								? "bg-red-500/10 border-red-500/20 text-red-400"
								: "border-gray-800 text-gray-500"
					)}
				>
					{rest.percentage === 0
						? `${rest.percentage}%`
						: formatNumber(rest.percentage / 100, {
							style: "percent",
							maximumFractionDigits: 0,
						})}
				</div>
			</CardContent>
		</Card>
	);
};
