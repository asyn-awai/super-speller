import React from "react";
import Navbar from "./Navbar";

interface NavbarItem {
	name: string;
	url: string;
}

interface Props {
	children: React.ReactNode;
	navbarProps: NavbarItem[];
	noNav?: boolean;
}

const Layout: React.FC<Props> = ({
	children,
	navbarProps,
	noNav,
}): JSX.Element => {
	return (
		<div>
			{!noNav && <Navbar links={navbarProps} />}
			{children}
		</div>
	);
};

export default Layout;
