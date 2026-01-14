import { EndButtons } from "@/components/shared/end-buttons";
import { XCircle } from "lucide-react";

export default function NotAvailablePage() {
	return (
		<div className="flex items-center justify-center min-h-[80dvh] bg-[#050505]">
			<div className="flex flex-col items-center p-8 space-y-6 max-w-lg text-center">
				<XCircle className="w-16 h-16 text-gray-500 opacity-50" />
				<h1 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-wider">
					Vehicle <span className="text-primary">Not Available</span>
				</h1>
				<p className="text-gray-400 font-light leading-relaxed">
					Sorry, that vehicle is no longer available.
					We have a large number of other vehicles that might suit your needs.
					Please inspect our current stock below.
				</p>
				<EndButtons />
			</div>
		</div>
	);
}
