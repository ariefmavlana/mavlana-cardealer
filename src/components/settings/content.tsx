"use client";

import { logoutOfAllSessions } from "@/app/_actions/sign-out";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const LogoutButton = () => {
	const { pending } = useFormStatus();

	return (
		<div className="mt-8 flex">
			<Button
				disabled={pending}
				className="flex items-center gap-x-2"
				variant="destructive"
				type="submit"
			>
				{pending && <Loader2 className="animate-spin w-4 h-4" />}
				{pending ? "Logging out..." : "Log out of all sessions"}
			</Button>
		</div>
	);
};

export const SettingsPageContent = () => {
	const [_, formAction] = useActionState(logoutOfAllSessions, null);

	return (
		<div className="divide-y divide-white/10 px-6">
			<div className="grid max-w-7xl grid-cols-1 gap-x-8 md:grid-cols-3 bg-[#0A0A0A] p-6 rounded-lg border border-white/10 shadow-lg">
				<div>
					<h2 className="text-base font-semibold leading-7 text-white font-heading tracking-wide uppercase">
						Log out of all sessions
					</h2>
					<p className="mt-2 text-sm leading-6 text-gray-500">
						This will log out out of all of your sessions across all of your
						devices of which you are currently logged into.
					</p>
				</div>
				<form action={formAction} className="md:col-span-2 flex items-center justify-end md:justify-start md:mt-0 mt-4">
					<LogoutButton />
				</form>
			</div>
		</div>
	);
};
