"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ActiveLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
}
export const ActiveLink = (props: ActiveLinkProps) => {
	const { href, children, className } = props;
	const pathname = usePathname();
	const isActive = href === pathname;

	return (
		<Link
			href={href}
			data-active={isActive}
			className={cn(className)}
		>
			{children}
		</Link>
	);
};
