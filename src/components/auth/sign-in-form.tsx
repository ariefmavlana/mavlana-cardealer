"use client";

import { signInAction } from "@/app/_actions/sign-in";
import { CircleCheckIcon, CircleX, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending}
			type="submit"
			className="w-full uppercase font-bold"
		>
			{pending && (
				<Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
			)}{" "}
			Sign In
		</Button>
	);
};

export const SignInForm = () => {
	const [state, formAction] = useActionState(signInAction, {
		success: false,
		message: "",
	});

	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state.success && formRef.current) {
			router.refresh();
			// router.push(routes.challenge);
		}
	}, [state, router]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-[#050505]">
			<div className="max-w-md w-full pb-60">
				<form
					ref={formRef}
					action={formAction}
					className="border-white/10 border shadow-[0_0_50px_rgba(0,0,0,0.5)] p-10 rounded-xl bg-[#0A0A0A] backdrop-blur-sm"
				>
					<div className="flex flex-col items-center mb-8 justify-center gap-2">
						<div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 border border-primary/20">
							<span className="text-2xl">🔐</span>
						</div>
						<h2 className="uppercase text-2xl font-bold font-heading text-white tracking-widest">Admin Access</h2>
						<p className="text-gray-500 text-sm">Enter your credentials to continue</p>
					</div>
					<div className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="email" className="text-gray-300">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								autoComplete="email"
								className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary/50 h-12"
								placeholder="admin@mavlana.com"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password" className="text-gray-300">Password</Label>
							<Input
								id="password"
								type="password"
								name="password"
								autoComplete="password"
								className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary/50 h-12"
								placeholder="••••••••"
								required
							/>
						</div>

						<div className="my-6">
							<p className="text-xs text-gray-500 mb-2 text-center bg-white/5 p-3 rounded border border-white/5">
								Authorized personnel only. Access is monitored.
							</p>
						</div>
						<div className="space-y-4">
							<SubmitButton />
							{state.success && (
								<div className="flex items-center gap-2 rounded-md bg-green-500/10 border border-green-500/20 p-3 text-green-400">
									<CircleCheckIcon className="h-5 w-5" />
									<span>Success! Redirecting...</span>
								</div>
							)}
							{!state.success && state.message && (
								<div className="flex items-center gap-2 rounded-md bg-red-500/10 border border-red-500/20 p-3 text-red-400">
									<CircleX className="h-5 w-5" />
									<span>{state.message}</span>
								</div>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
