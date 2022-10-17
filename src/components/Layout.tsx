import React, { useState } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

interface NavbarItem {
	name: string;
	url: string;
}

interface Props {
	children: React.ReactNode;
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	navbarProps?: NavbarItem[];
	topNav?: boolean;
	sideNav?: boolean;
	footer?: boolean;
}

const Layout: React.FC<Props> = ({
	children,
	darkMode,
	setDarkMode,
	navbarProps = [],
	topNav = false,
	sideNav = false,
	footer = false,
}): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [modalData, setModalData] = useState<React.ReactNode>(<></>);
	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)} center>
				<h1>Modal</h1>
			</Modal>
			<div className="w-auto h-auto sm:h-full sm:w-full d">
				{sideNav && (
					<div className="fixed z-50 hidden w-24 transition-all duration-300 ease-in-out group hover:md:w-48 md:block">
						<SideNav
							darkMode={darkMode}
							setDarkMode={setDarkMode}
						/>
					</div>
				)}
				{topNav && (
					<TopNav
						links={navbarProps}
						darkMode={darkMode}
						setDarkMode={setDarkMode}
					/>
				)}
				<div
					className={`${
						sideNav && "md:ml-36"
					} px-5 md:px-0 d md:mr-10`}
				>
					{children}
				</div>
				{footer && (
					<>
						{/* <br /> */}
						<footer
							className={`${
								sideNav && "pl-32"
							} transition-colors bg-gray-100 border border-none h-36 dark:bg-gray-700`}
						>
							Footer
						</footer>
					</>
				)}
			</div>
		</>
	);
};

export default Layout;
