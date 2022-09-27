import React from "react";
import Navbar from "./Navbar";

interface NavbarItem {
	name: string;
	url: string;
}

interface Props {
	children: React.ReactNode;
	navbarProps: NavbarItem[];
	topNav?: boolean;
	sideNav?: boolean;
}

const Layout: React.FC<Props> = ({
	children,
	navbarProps,
	topNav = false,
    sideNav = false,
}): JSX.Element => {
	return (
		<div>
			{topNav && <Navbar links={navbarProps} />}
			{children}
		</div>
	);
};

export default Layout;
