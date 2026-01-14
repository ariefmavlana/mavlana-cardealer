"use client";
import { routes } from "@/config/routes";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
	CarFrontIcon,
	LayoutDashboardIcon,
	SettingsIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ActiveLink } from "../ui/active-link";

const navigation = [
	{
		name: "Dashboard",
		href: routes.admin.dashboard,
		icon: LayoutDashboardIcon,
	},
	{
		name: "Classifieds",
		href: routes.admin.classifieds,
		icon: CarFrontIcon,
	},
	{
		name: "Customers",
		href: routes.admin.customers,
		icon: UsersIcon,
	},
	{
		name: "Settings",
		href: routes.admin.settings,
		icon: SettingsIcon,
	},
];

export const AdminSidebar = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
	const handleSidebarHover = useCallback((expanded: boolean) => {
		setIsSidebarExpanded(expanded);
	}, []);

	const sidebarVariants: Variants = {
		expanded: { width: 256 },
		collapsed: { width: "fit-content" },
	};

	const menuTextVariants: Variants = {
		expanded: {
			opacity: 1,
			width: "auto",
			marginLeft: 10,
		},
		collapsed: { opacity: 0, width: 0 },
	};

	const logoVariants: Variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<motion.div
			className="bg-[#050505] border-r border-white/10 h-screen overflow-hidden flex flex-col pt-6 z-50 relative"
			animate={isSidebarExpanded ? "expanded" : "collapsed"}
			variants={sidebarVariants}
			initial="collapsed"
			transition={{ duration: 0.3, ease: "easeInOut" }}
			onMouseEnter={() => handleSidebarHover(true)}
			onMouseLeave={() => handleSidebarHover(false)}
		>
			<div className="flex flex-col grow px-4">
				<Link href={routes.home} className="mb-8 block">
					<div className="relative h-[40px] w-full flex items-center justify-center">
						<AnimatePresence initial={false} mode="wait">
							{isSidebarExpanded ? (
								<motion.div
									key="expanded-logo"
									className="absolute inset-0 flex items-center"
									variants={logoVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									transition={{ duration: 0.4 }}
								>
									<span className="font-heading text-xl font-bold text-primary tracking-widest uppercase truncate ml-2">
										Mavlana
									</span>
								</motion.div>
							) : (
								<motion.div
									key="collapsed-logo"
									className="absolute inset-0 flex items-center justify-center"
									variants={logoVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									transition={{ duration: 0.1 }}
								>
									<span className="font-heading text-xl font-bold text-primary border border-primary/20 rounded-lg w-10 h-10 flex items-center justify-center bg-primary/5">M</span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</Link>
				<nav className="flex flex-col gap-2">
					{navigation.map((item, index) => {
						const isSeparator = item.name === "Classifieds";
						return (
							<div key={item.name} className={isSeparator ? "mt-6 pt-6 border-t border-white/5" : ""}>
								{isSeparator && isSidebarExpanded && (
									<p className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-3 mb-3">Inventory</p>
								)}
								<ActiveLink
									href={item.href}
									className="flex items-center p-3 rounded-lg transition-all duration-200 w-full cursor-pointer hover:bg-white/5 data-[active=true]:bg-primary/10 data-[active=true]:border-primary/20 border border-transparent"
								>
									<div className="flex items-center">
										<item.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-primary data-[active=true]:text-primary" />
										<motion.span
											variants={menuTextVariants}
											animate={isSidebarExpanded ? "expanded" : "collapsed"}
											initial="collapsed"
											transition={{ duration: 0.3, ease: "easeInOut" }}
											className="whitespace-nowrap overflow-hidden text-sm font-medium text-gray-300 group-hover:text-white"
										>
											{item.name}
										</motion.span>
									</div>
								</ActiveLink>
							</div>
						);
					})}
				</nav>
			</div>
		</motion.div>
	);
};
