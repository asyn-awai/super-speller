import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import {
	FaThList,
	FaUserCircle,
	FaChartPie,
	FaTrophy,
	FaGraduationCap,
	FaSignOutAlt,
	FaMoon,
	FaSun,
} from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	const [location, setLocation] = useState<string>(useLocation().pathname);
	return (
		<nav className="w-full h-screen bg-blue-500 shadow-lg shadow-black">
			<div className="text-white">
				<h1 className="w-full pt-4 text-2xl font-bold text-center transition-transform duration-300 origin-left scale-0 cursor-pointer whitespace-nowrap group-hover:scale-100">
					Super Speller
				</h1>
			</div>
			<br />
			<div className="flex flex-col justify-between h-[85%] overflow-x-hidden overflow-y-scroll scrollbar-hide">
				<div>
					{[
						"Dashboard",
						"Lists",
						"Leaderboard",
						"Mastery",
						// "Test",
						// "Test",
					].map((item, i) => (
                        // nano id breaks animation?
						<NavItem
							item={item}
							darkMode={darkMode}
							key={i}
						/>
					))}
				</div>
				<div>
					<NavItem
						item="Theme"
						darkMode={darkMode}
						setDarkMode={setDarkMode}
					/>
					<NavItem item="Profile" darkMode={darkMode} />
					<NavItem item="Logout" darkMode={darkMode} />
				</div>
			</div>
		</nav>
	);
};

export default SideNav;

const NavItem: React.FC<{
	item: string;
	darkMode: boolean;
	setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ item, darkMode, setDarkMode = null }): JSX.Element => {
    const navigate = useNavigate();
	const sameLocation =
		window.location.pathname.substring(1) === item.toLowerCase();
	const itemInfo = getNavItem(item, darkMode);

	return (
		<div
			className={`flex items-center w-full h-12 py-8 px-3 transition-all cursor-pointer group-hover:px-0 ${
				sameLocation && "bg-blue-700"
			} hover:bg-blue-700 hover:text-white select-none`}
			onClick={() => {
				if (sameLocation) return;
				if (setDarkMode) {
					setDarkMode(!darkMode);
				} else {
					navigate(itemInfo.path ?? "");
					itemInfo.onClick();
				}
			}}
		>
			<div>{itemInfo.image}</div>
			<p className="text-xl font-semibold text-white transition-transform origin-left scale-0 group-hover:md:scale-100">
				{item}
			</p>
		</div>
	);
};

const getNavItem = (
	item: string,
	darkMode: boolean
): {
	image: JSX.Element;
	path: string | null;
	onClick: () => void;
} => {
	item = item.toLowerCase();
	return (
		{
			test: {
				image: <FaThList className="mx-5" size={25} color="white" />,
				path: "/",
				onClick: () => {},
			},
			dashboard: {
				image: <FaChartPie className="mx-5" size={25} color="white" />,
				path: "/dashboard",
				onClick: () => {},
			},
			lists: {
				image: <FaThList className="mx-5" size={25} color="white" />,
				path: "/lists",
				onClick: () => {},
			},
			leaderboard: {
				image: <FaTrophy className="mx-5" size={25} color="white" />,
				path: "/leaderboard",
				onClick: () => {},
			},
			mastery: {
				image: (
					<FaGraduationCap className="mx-5" size={25} color="white" />
				),
				path: "/mastery",
				onClick: () => {},
			},
			profile: {
				image: (
					<FaUserCircle className="mx-5" size={25} color="white" />
				),
				path: "/profile",
				onClick: () => {},
			},
			logout: {
				image: (
					<FaSignOutAlt
						className="mx-5"
						size={25}
						color="white"
						style={{
							transform: "rotateY(180deg)",
						}}
					/>
				),
				path: "/",
				onClick: () => {
					localStorage.removeItem("authUser");
				},
			},
			theme: {
				image: darkMode ? (
					<FaMoon className="mx-5" size={25} color="white" />
				) : (
					<FaSun className="mx-5" size={25} color="white" />
				),
				path: null,
				onClick: () => {},
			},
		}[item] ??
		({ path: null, onClick: () => {} } as {
			image: JSX.Element;
			path: string | null;
			onClick: () => void;
		})
	);
};
