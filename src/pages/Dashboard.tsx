import React from "react";
import SideNav from "../components/SideNav";
import Layout from "../components/Layout";
//https://www.npmjs.com/package/react-minimal-pie-chart

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

//scrapped
const Dashboard: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	return (
		<Layout
			navbarProps={[{ name: "Home", url: "/" }]}
			darkMode={darkMode}
			setDarkMode={setDarkMode}
			centerContent
			sideNav
		>
			<div className="min-h-screen"></div>
		</Layout>
	);
};

export default Dashboard;
