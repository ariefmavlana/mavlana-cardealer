import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { SiInstagram, SiMeta, SiX } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "../shared/newsletter-form";
const socialLinks = [
	{
		id: 1,
		href: "https://facebook.com",
		icon: (
			<SiMeta className="w-5 h-5 text-white/60 hover:text-primary transition-colors" />
		),
	},
	{
		id: 2,
		href: "https://twitter.com",
		icon: (
			<SiX className="w-5 h-5 text-white/60 hover:text-primary transition-colors" />
		),
	},
	{
		id: 3,
		href: "https://instagram.com",
		icon: (
			<SiInstagram className="w-5 h-5 text-white/60 hover:text-primary transition-colors" />
		),
	},
];

export const PublicFooter = () => {
	return (
		<footer className="bg-black border-t border-white/10 px-8 py-16">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
				<div className="flex flex-col space-y-6">
					<Link className="flex items-center gap-2" href={routes.home}>
						<span className="font-heading text-2xl font-bold tracking-widest uppercase text-white">
							Mavlana<span className="text-primary">.</span>
						</span>
					</Link>
					<p className="text-gray-300 text-sm font-light max-w-xs leading-relaxed">
						Curating the finest automotive engineering for discerning collectors.
						Experience the pinnacle of luxury.
					</p>
					<div className="flex space-x-6 pt-2">
						{socialLinks.map((link) => {
							return (
								<Link href={link.href} key={link.id}>
									{link.icon}
								</Link>
							);
						})}
					</div>
				</div>

				<div className="space-y-4">
					<h4 className="text-white font-heading font-bold uppercase tracking-wider text-sm">
						Navigation
					</h4>
					<ul className="space-y-2">
						{navLinks.map((link) => (
							<li key={link.id}>
								<Link
									href={link.href}
									className="text-gray-300 hover:text-primary transition-colors text-sm tracking-wide uppercase"
								>
									{link.label}
								</Link>
							</li>
						))}
						<li>
							<Link
								href={routes.signIn}
								className="text-gray-300 hover:text-primary transition-colors text-sm tracking-wide uppercase"
							>
								Backoffice
							</Link>
						</li>
					</ul>
				</div>

				<div className="space-y-4">
					<h4 className="text-white font-heading font-bold uppercase tracking-wider text-sm">
						Stay Informed
					</h4>
					<p className="text-gray-300 text-sm font-light">
						Subscribe for exclusive access to new arrivals.
					</p>
					<NewsletterForm />
				</div>
			</div>

			<div className="container mx-auto mt-16 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs tracking-wider">
				<p>&copy; {new Date().getFullYear()} Mavlana Motors. All Rights Reserved.</p>
				<div className="flex gap-x-6 mt-4 md:mt-0">
					<span>Privacy Policy</span>
					<span>Terms of Service</span>
				</div>
			</div>
		</footer>
	);
};
