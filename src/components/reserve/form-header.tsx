"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const FormHeader = () => {
	const params = useSearchParams();
	const steps = [
		{ id: "1", title: "Welcome" },
		{ id: "2", title: "Select Handover Date" },
		{ id: "3", title: "Submit Details" },
	];

	return (
		<div className="flex justify-between bg-[#0A0A0A] border-b border-white/10 p-4 shadow-lg rounded-t-lg">
			<div className="flex flex-col justify-between flex-1">
				<h1 className="text-xl md:text-2xl font-heading font-bold text-primary tracking-wide uppercase">
					{steps.find(({ id }) => params.get("step") === id)?.title}
				</h1>
			</div>
			<div className="flex items-center justify-end gap-2 text-sm font-medium flex-1">
				{steps.map((step) => (
					<div
						className={cn(
							"w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300",
							params.get("step") === step.id
								? "bg-primary text-black border-primary font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
								: "bg-transparent text-gray-500 border-gray-700"
						)}
						key={step.id}
					>
						{step.id}
					</div>
				))}
			</div>
		</div>
	);
};
