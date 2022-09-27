import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	FaThList,
	FaUserCircle,
	FaChartPie,
	FaTrophy,
	FaGraduationCap,
    FaSignOutAlt,
} from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

const SideNav: React.FC = (): JSX.Element => {
	const [location, setLocation] = useState<string>(useLocation().pathname);
	return (
		<nav className="w-full h-screen bg-blue-500">
			<div className="text-white">
				<h1 className="w-full pt-4 text-2xl font-bold text-center transition-transform duration-300 origin-left scale-0 cursor-pointer whitespace-nowrap group-hover:scale-100">
					Super Speller
				</h1>
			</div>
			<br />
			<div className="flex flex-col justify-between h-[85%]">
				<div>
					{[
						"Dashboard",
						"Lists",
						"Leaderboard",
						"Mastery",
						"Test",
						"Test",
					].map(item => (
						<NavItem item={item} />
					))}
				</div>
				<div>
					<NavItem item="Profile" />
					<NavItem item="Logout" />
				</div>
			</div>
		</nav>
	);
};

export default SideNav;

const NavItem: React.FC<{
	item: string;
}> = ({ item }): JSX.Element => {
	return (
		<div
			className={`flex items-center w-full h-12 py-8 px-3 transition-all cursor-pointer group-hover:px-0 ${
				window.location.pathname.substring(1) === item.toLowerCase() &&
				"bg-blue-700"
			} hover:bg-blue-700 hover:text-white`}
		>
			<div>{getNavItem(item).image}</div>
			<p className="text-xl font-semibold text-white transition-transform origin-left scale-0 group-hover:md:scale-100">
				{item}
			</p>
		</div>
	);
};

const getNavItem = (
	item: string
): {
	image: JSX.Element;
	url: string;
} => {
	item = item.toLowerCase();
	return (
		{
			test: {
				image: <FaThList className="mx-5" size={25} color="white" />,
				url: "/",
			},
			dashboard: {
				image: <FaChartPie className="mx-5" size={25} color="white" />,
				url: "/dashboard",
			},
			lists: {
				image: <FaThList className="mx-5" size={25} color="white" />,
				url: "/lists",
			},
			leaderboard: {
				image: <FaTrophy className="mx-5" size={25} color="white" />,
				url: "/leaderboard",
			},
			mastery: {
				image: (
					<FaGraduationCap className="mx-5" size={25} color="white" />
				),
				url: "/mastery",
			},
			profile: {
				image: (
					<FaUserCircle className="mx-5" size={25} color="white" />
				),
				url: "/",
			},
            logout: {
				image: (
					<FaSignOutAlt className="mx-5" size={25} color="white" style={{
                        transform: "rotateY(180deg)"
                    }} />
				),
				url: "/",
			},
		}[item] ?? ({} as { image: JSX.Element; url: string })
	);
};
