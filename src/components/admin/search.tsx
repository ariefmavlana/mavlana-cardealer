"use client";
import { usePathname } from "next/navigation";
import { SearchInput } from "../shared/search-input";

export const AdminSearch = () => {
	const pathname = usePathname();
	return (
		<SearchInput
			placeholder={`Search ${pathname.split("/")[2]}...`}
			className="w-full focus-visible:ring-primary bg-black border-white/20 text-white placeholder:text-gray-500 rounded-full pl-10 h-10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
		/>
	);
};
