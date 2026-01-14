"use client";

import {
	completeChallengeAction,
	resendChallengeAction,
} from "@/app/_actions/challenge";
import {
	OneTimePasswordSchema,
	type OtpSchemaType,
} from "@/app/schemas/otp.schema";
import { routes } from "@/config/routes";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { OneTimePasswordInput } from "./otp-input";

export const OtpForm = () => {
	const [isCodePending, startCodeTransition] = useTransition();
	const [isSubmitPending, startSubmitTransition] = useTransition();
	const router = useRouter();

	const form = useForm<OtpSchemaType>({
		resolver: zodResolver(OneTimePasswordSchema),
	});

	const onSubmit: SubmitHandler<OtpSchemaType> = (data) => {
		startSubmitTransition(async () => {
			const result = await completeChallengeAction(data.code);
			console.log("first", { result });

			if (!result?.success) {
				toast({
					title: "Error",
					description: result.message,
					variant: "destructive",
				});
			} else {
				router.push(routes.admin.dashboard);
			}
		});
	};

	const [sendButtonText, setSendButtonText] = useState("Send code");

	const sendCode = () => {
		startCodeTransition(async () => {
			const { success, message } = await resendChallengeAction();
			setSendButtonText("Resend code");

			if (!success) {
				toast({
					title: "Error",
					description: message,
					variant: "destructive",
				});
				return;
			}

			toast({
				title: "Code sent",
				description: "Check your email for the code",
			});
		});
	};

	useEffect(() => {
		if (isCodePending) setSendButtonText("Sending...");
	}, [isCodePending]);

	return (
		<div className="min-h-[calc(100vh-4rem)] flex w-full flex-1 justify-center px-6 pt-10 lg:items-center lg:pt-0 bg-[#050505]">
			<div className="flex w-full max-w-lg flex-col border-white/10 border shadow-[0_0_50px_rgba(0,0,0,0.5)] p-10 rounded-xl bg-[#0A0A0A] backdrop-blur-sm">
				<div className="flex flex-col items-center mb-6">
					<div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
						<span className="text-2xl">🛡️</span>
					</div>
					<h3 className="mb-2 text-2xl lg:text-3xl text-center font-heading text-white tracking-wide font-bold uppercase">
						One Time Password
					</h3>
					<p className="mb-8 text-center text-gray-400 text-sm">
						Enter the six digit code sent to your email
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="code"
							render={({ field: { value, onChange, ...rest } }) => (
								<FormItem className="mb-8 flex justify-center">
									<FormControl>
										<OneTimePasswordInput
											type="number"
											setValue={onChange}
											{...rest}
										/>
									</FormControl>
									<FormMessage className="text-center mt-2" />
								</FormItem>
							)}
						/>

						<div className="flex w-full items-center justify-center">
							<button
								type="button"
								className="flex items-center gap-2.5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-primary group cursor-pointer uppercase tracking-wider"
								onClick={sendCode}
								disabled={isCodePending}
							>
								{isCodePending ? (
									<Loader2 className="w-4 h-4 text-primary animate-spin" />
								) : (
									<RotateCw className="w-4 h-4 text-gray-600 transition-colors duration-200 group-hover:text-primary" />
								)}
								{sendButtonText}
							</button>
						</div>
						<div className="mt-8 flex w-full flex-col gap-4">
							<Button
								className="flex w-full gap-x-2 font-bold"
								disabled={isSubmitPending}
							>
								<span className="text-sm uppercase tracking-wider text-inherit">
									{isSubmitPending ? "Verifying..." : "Verify Code"}
								</span>
								{isSubmitPending ? (
									<Loader2 className="w-4 h-4 shrink-0 animate-spin" />
								) : null}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};
