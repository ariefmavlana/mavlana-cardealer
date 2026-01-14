"use client";

import {
	type MultiStepFormComponentProps,
	MultiStepFormEnum,
} from "@/config/types";
import {
	ArrowRightIcon,
	CircleCheckIcon,
	CreditCardIcon,
	Loader2,
	LockIcon,
	StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { HTMLParser } from "../shared/html-parser";
import { Button } from "../ui/button";

export const Welcome = (props: MultiStepFormComponentProps) => {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const nextStep = () => {
		startTransition(async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			const url = new URL(window.location.href);
			url.searchParams.set("step", MultiStepFormEnum.SELECT_DATE.toString());
			router.push(url.toString());
		});
	};

	return (
		<div className="mx-auto bg-[#0A0A0A] border border-white/10 rounded-b-lg shadow-2xl">
			<div className="p-6">
				<div className="flex gap-x-12 justify-between">
					<div className="flex-1">
						<div className="flex items-start mb-4">
							<CircleCheckIcon className="text-primary w-6 h-6 mr-2" />
							<p className="text-gray-200">
								Reserve in minutes with 2 simple steps
							</p>
						</div>
						<div className="flex items-start mb-4">
							<CircleCheckIcon className="text-primary w-6 h-6 mr-2" />
							<p className="text-gray-200">
								Arrange a handover date for your new vehicle
							</p>
						</div>
					</div>
					<div className="flex flex-1 space-x-2">
						<div className="relative w-16 h-16 bg-white/5 rounded-md overflow-hidden">
							<Image
								src={props.classified.make.image}
								alt={props.classified.make.name}
								className="aspect-1/1 object-contain p-2"
								height={100}
								width={100}
							/>
						</div>
						<div className="flex-1 text-white">
							<h2 className="text-lg font-heading font-bold line-clamp-1 text-primary">
								{props.classified.title}
							</h2>
							<div className="text-xs text-gray-400 line-clamp-2">
								<HTMLParser html={props.classified.description ?? ""} />
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-around items-center bg-white/5 border border-white/10 p-4 rounded-md mb-4 mt-6">
					<div className="text-center">
						<p className="font-bold text-white">Select Handover Date & Time</p>
						<p className="text-gray-400 text-xs mt-1">approx. 1 minute</p>
					</div>
					<ArrowRightIcon className="w-5 h-5 text-primary" />
					<div className="text-center">
						<p className="font-bold text-white">Submit Your Details</p>
						<p className="text-gray-400 text-xs mt-1">approx. 1 minute</p>
					</div>
				</div>
				<p className="font-bold mb-4 text-white text-center tracking-wide uppercase">Ready to begin?</p>
				<div className="flex justify-around items-center text-gray-300">
					<div className="flex items-center flex-col justify-center space-y-2">
						<LockIcon className="w-6 h-6 text-primary/70" />
						<p className="text-sm">SSL Secure</p>
					</div>
					<div className="flex items-center flex-col justify-center space-y-2">
						<StarIcon className="w-6 h-6 text-primary/70" />
						<p className="text-sm">Trustpilot</p>
					</div>
					<div className="flex items-center flex-col justify-center space-y-2">
						<CreditCardIcon className="w-6 h-6 text-primary/70" />
						<p className="text-sm">Stripe</p>
					</div>
				</div>
			</div>
			<div className="p-6 border-t border-white/10 bg-white/5">
				<Button
					type="button"
					onClick={nextStep}
					disabled={isPending}
					className="uppercase font-bold flex gap-x-3 w-full bg-primary text-black hover:bg-white hover:text-black tracking-widest"
				>
					{isPending ? (
						<Loader2 className="w-4 h-4 shrink-0 animate-spin" />
					) : null}{" "}
					I'm Ready
				</Button>
			</div>
		</div>
	);
};
