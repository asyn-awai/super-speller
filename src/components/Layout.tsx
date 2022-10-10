import React from "react";
import Navbar from "./TopNav";
import SideNav from "./SideNav";

interface NavbarItem {
	name: string;
	url: string;
}

interface Props {
	children: React.ReactNode;
	navbarProps: NavbarItem[];
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	topNav?: boolean;
	sideNav?: boolean;
	footer?: boolean;
}

const Layout: React.FC<Props> = ({
	children,
	navbarProps,
	darkMode,
	setDarkMode,
	topNav = false,
	sideNav = false,
	footer = false,
}): JSX.Element => {
	return (
		<div className="d">
			{sideNav && (
				<div className="fixed z-50 hidden w-24 transition-all duration-300 ease-in-out group hover:md:w-48 md:block">
					<SideNav darkMode={darkMode} setDarkMode={setDarkMode} />
				</div>
			)}
			{topNav && (
				<Navbar
					links={navbarProps}
					darkMode={darkMode}
					setDarkMode={setDarkMode}
				/>
			)}
			<div className={`${sideNav && "md:ml-36"} px-5 md:px-0`}>
				{children}
			</div>
			{footer && (
				<>
					<br />
					<footer className="pl-32 transition-colors bg-gray-100 border border-none h-36 dark:bg-gray-700">
						Footer
					</footer>
				</>
			)}
		</div>
	);
};

export default Layout;
