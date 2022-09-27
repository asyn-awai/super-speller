import React from "react";
import SideNav from "../components/SideNav";
import Layout from "../components/Layout";
//https://www.npmjs.com/package/react-minimal-pie-chart
const Dashboard: React.FC = (): JSX.Element => {
	//todo add option for no signin btn
	return (
		<Layout navbarProps={[{ name: "Home", url: "/" }]}>
			<div className="fixed hidden w-24 transition-all duration-300 ease-in-out group hover:md:w-48 md:block">
				<SideNav />
			</div>
			<div className="flex flex-col h-auto min-h-screen gap-5 mx-2 mb-10 md:ml-36 md:mr-9">
				<br />
				<div className="flex items-center justify-around w-full bg-white border h-28">
					<p>0 day streak</p>
					<p>0 xp this week</p>
					<p>0 lessons completed this week</p>
				</div>
				<div className="flex gap-5 h-52">
					<div className="w-3/4 h-full border"></div>
					<div className="w-1/4 h-full border"></div>
				</div>
				<h1 className="text-2xl font-bold text-gray-600">
					Recently Viewed
				</h1>
				<div className="flex flex-col h-auto gap-5 border">
					<div className="border h-14">List</div>
					<div className="border h-14">List</div>
					<div className="border h-14">List</div>
					<div className="border h-14">List</div>
					<div className="border h-14">List</div>
				</div>
			</div>
			<div className="bg-gray-300 border ml-28 h-36">Footer</div>
		</Layout>
	);
};

export default Dashboard;
