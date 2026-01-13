import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google"; // Luxury Fonts
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export const metadata: Metadata = {
	title: "Mavlana Car Dealer",
	description: "Premium Luxury Car Dealership.",
};

const cinzel = Cinzel({
	weight: "variable",
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

const outfit = Outfit({
	weight: "variable",
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"antialiased overscroll-none bg-background font-body text-foreground", // Default to font-body
					outfit.variable,
					cinzel.variable,
				)}
			>
				<NextTopLoader showSpinner={false} />
				<NuqsAdapter>{children}</NuqsAdapter>
				<Toaster />
			</body>
		</html>
	);
}
