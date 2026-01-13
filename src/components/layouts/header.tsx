import { auth } from "@/auth";
import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import type { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { HeartIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignOutForm } from "../auth/sign-out-form";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

export const PublicHeader = async () => {
	const session = await auth();
	const sourceId = await getSourceId();
	const favourites = await redis.get<Favourites>(sourceId ?? "");
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between h-20 px-4 md:px-12 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-300">
			<div className="flex items-center flex-1">
				<Link href={routes.home} className="flex items-center gap-2">
					<span className="font-heading text-2xl md:text-3xl text-primary font-bold tracking-widest uppercase">
						Mavlana
					</span>
				</Link>
			</div>
			<nav className="hidden md:flex gap-x-8">
				{navLinks.map((link) => (
					<Link
						className="relative group font-heading text-sm tracking-widest text-foreground hover:text-primary transition-colors duration-300 uppercase py-2"
						href={link.href}
						key={link.id}
					>
						{link.label}
						<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
					</Link>
				))}
			</nav>
			{session ? (
				<div className="items-center md:flex gap-x-6 hidden">
					<Link
						href={routes.admin.dashboard}
						className="text-foreground hover:text-primary transition-colors font-heading text-sm uppercase tracking-wider"
					>
						Backoffice
					</Link>
					<SignOutForm />
				</div>
			) : (
				<Link href={routes.favourites} className="group relative">
					<div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
						<HeartIcon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
					</div>
					{favourites && favourites.ids.length > 0 && (
						<div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] text-black font-bold">
							{favourites.ids.length}
						</div>
					)}
				</Link>
			)}
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="link" size="icon" className="md:hidden border-none">
						<MenuIcon className="h-6 w-6 text-primary" />
						<SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-full max-w-xs p-6 bg-black/95 border-l border-white/10 backdrop-blur-xl">
					<nav className="grid gap-6 mt-8">
						{navLinks.map((link) => (
							<Link
								className="flex items-center gap-2 text-xl font-heading text-white/80 hover:text-primary transition-colors tracking-widest uppercase"
								href={link.href}
								key={link.id}
							>
								{link.label}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
};
