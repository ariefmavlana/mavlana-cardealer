import { routes } from "@/config/routes";
import { CarIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const EndButtons = () => {
	return (
		<div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
			<Button
				variant="outline"
				className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-black uppercase font-bold tracking-wider transition-all duration-300"
				asChild
			>
				<Link href={routes.home}>
					<HomeIcon className="mr-2 h-4 w-4" /> Go to Homepage
				</Link>
			</Button>
			<Button
				asChild
				className="w-full sm:w-auto bg-primary text-black hover:bg-white hover:text-black uppercase font-bold tracking-wider transition-all duration-300 shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)]"
			>
				<Link href={routes.inventory}>
					<CarIcon className="mr-2 h-4 w-4" /> View Classifieds
				</Link>
			</Button>
		</div>
	);
};
