import { EndButtons } from "@/components/shared/end-buttons";
import { CircleCheck } from "lucide-react";

export default function SuccessfulReservationPage() {
	return (
		<div className="flex min-h-[80dvh] flex-col items-center justify-center bg-[#050505] text-white px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<CircleCheck className="mx-auto w-16 h-16 text-primary animate-bounce shadow-[0_0_20px_rgba(212,175,55,0.6)] rounded-full" />
				<h1 className="mt-8 text-3xl font-heading font-bold tracking-widest text-primary sm:text-4xl uppercase">
					Reservation Confirmed
				</h1>
				<p className="mt-4 text-gray-400 font-light tracking-wide">
					Thank you for your reservation. We'll see you soon.
				</p>
				<div className="mt-8">
					<EndButtons />
				</div>
			</div>
		</div>
	);
}
