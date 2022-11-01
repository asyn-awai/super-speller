import React, { useState } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";

interface NavbarItem {
	name: string;
	url: string;
}

interface Props {
	children: React.ReactNode;
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	modalChildren?: React.ReactNode;
	centerContent?: boolean;
	navbarProps?: NavbarItem[];
	topNav?: boolean;
	sideNav?: boolean;
	footer?: boolean;
}

const Layout: React.FC<Props> = ({
	children,
	darkMode,
	setDarkMode,
	modalChildren = null,
	navbarProps = [],
	centerContent = false,
	topNav = false,
	sideNav = false,
	footer = false,
}): JSX.Element => {
	const [sideNavBtnOpen, setSideNavBtnOpen] = useState(false);
	// const [modalData, setModalData] = useState<React.ReactNode>(<></>);
	return (
		<>
			{/*{modalChildren && (*/}

			{/*)}*/}
			<div className="h-auto sm:h-full w-full d">
				{sideNav && (
					<>
						{/* <div
							className="fixed bottom-6 left-6 md:hidden block"
							onClick={() => setSideNavBtnOpen(prev => !prev)}
						>
							<div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
								<p>image</p>
							</div>
						</div> */}
						<div className="fixed z-50 hidden w-24 transition-all duration-300 ease-in-out group hover:md:w-48 md:block">
							<SideNav
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						</div>
					</>
				)}
				{topNav && (
					<TopNav
						links={navbarProps}
						darkMode={darkMode}
						setDarkMode={setDarkMode}
					/>
				)}
				<div
					className={`${sideNav && "md:ml-36"} ${
						centerContent && "flex justify-center"
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
