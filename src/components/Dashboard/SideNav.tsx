import React from "react";
import { FaThList, FaUserCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

const SideNav: React.FC = (): JSX.Element => {
	return (
		<nav className="w-full h-screen bg-blue-500">
			<div className="text-white">
				<h1 className="w-full pt-4 text-2xl font-bold text-center scale-0 cursor-pointer whitespace-nowrap group-hover:scale-100">
					Super Speller
				</h1>
			</div>
			<br />
			<div className="flex flex-col justify-between h-[85%]">
				<div>
					{["Test", "Test", "Test", "Test", "Test", "Test"].map(
						item => (
							<NavItem item={item} />
						)
					)}
				</div>
				<div>
					<NavItem item="Profile" />
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
		<div className="flex items-center w-full h-12 py-4 mx-5 transition-all cursor-pointer group-hover:mx-0 hover:bg-blue-700 hover:text-white">
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
			profile: {
				image: (
					<FaUserCircle className="mx-5" size={25} color="white" />
				),
				url: "/",
			},
		}[item] ?? ({} as { image: JSX.Element; url: string })
	);
};
