import React from "react";
import SideNav from "../components/SideNav";
import Layout from "../components/Layout";
//https://www.npmjs.com/package/react-minimal-pie-chart

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	//todo add option for no signin btn
	return (
		<Layout
			navbarProps={[{ name: "Home", url: "/" }]}
			darkMode={darkMode}
			setDarkMode={setDarkMode}
			sideNav
			footer
		>
			<div className="flex flex-col h-auto min-h-screen gap-5 mx-2 mb-10 md:mr-9">
				<br />
				{/*Overview*/}
				<div className="flex items-center justify-around w-full border h-28">
					<h1 className="text-xl font-bold">Activity</h1>
					<div className="flex flex-row gap-14">
						<p>0 day streak</p>
						<p>0 xp this week</p>
						<p>0 lessons completed this week</p>
					</div>
				</div>
				<br />
				<div className="flex gap-x-5 h-52">
					{/*Info*/}
					<div
						style={{
							backgroundImage: `url(
								https://imgs.search.brave.com/4uc-i_KFw4ow4hc5IPaSYzlu5cb0gD_ha22otUTk0RU/rs:fit:768:290:1/g:ce/aHR0cHM6Ly93d3cu/dGl2cGVyZnVtZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTcvMDEvTmV3cy1C/YW5uZXItSW1hZ2Ut/NzY4eDI5MC5wbmc
							)`,
						}}
						className="w-[60%] h-full p-5 md:bg-cover rounded"
					>
						{/* position one div on top left and the other on bottom right */}
						<h1 className="text-2xl font-bold text-white">
							Information
						</h1>
						<h1 className="w-full text-gray-200 scale-0 text-md whitespace-nowrap xl:scale-100">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Et beatae voluptates lo lo
						</h1>
						{/* 80% temp solution */}
						<div className="flex items-end justify-end h-[80%]">
							<div className="flex items-center justify-center h-10 m-5 font-bold text-center text-white transition-colors bg-blue-500 rounded cursor-pointer w-36 hover:bg-blue-600">
								Go now
							</div>
						</div>
					</div>
					{/*Info side*/}
					<div className="w-[40%] h-full border"></div>
				</div>
				<br />
				{/* Recently Viewed */}
				<h1 className="text-xl font-bold d">Recently Viewed</h1>
				{/* Recently Viewed Items (max 5) */}
				<div className="flex flex-col h-auto gap-5">
					<RVCard />
					<RVCard />
					<RVCard />
					<RVCard />
					<RVCard />
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;

interface RVCardProps {
	title: string;
	description: string;
	image: string;
	url: string;
	author: string;
}

const RVCard: React.FC<Partial<RVCardProps>> = ({
	title = "Title",
	description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint iste eaque exercitationem adipisci, tenetur quos eius alias beatae assumenda? Distinctio consequuntur corporis eaque ullam? Natus obcaecati dignissimos rerum nesciunt eaque!",
	image = "https://imgs.search.brave.com/vU2ba85dA64ykRlQzQrFKyR_2xNlb7u1fCZJ6XEUPVc/rs:fit:820:434:1/g:ce/aHR0cHM6Ly93d3cu/cG5na2V5LmNvbS9w/bmcvZGV0YWlsLzIz/My0yMzMyNjc3X2lt/YWdlLTUwMDU4MC1w/bGFjZWhvbGRlci10/cmFuc3BhcmVudC5w/bmc",
	url = "",
	author = "Author",
}): JSX.Element => {
	return (
		<div
			className="p-5 shadow-md transition-all border cursor-pointer group hover:scale-[102%] rounded dark:border-gray-800 bg-gray-100 dark:bg-gray-700"
			onClick={() => {
				/* redirect to url */
			}}
		>
			<div className="flex items-center mb-2">
				<img
					src={image}
					className="object-cover mr-8 transition-transform max-h-20 aspect-square group-hover:scale-105"
				/>
				<div className="group-hover:scale-[101%] transition-transform">
					<h2 className="text-lg font-bold transition-transform d line-clamp-1">
						{title}
					</h2>
					<h3 className="text-sm font-semibold transition-transform d line-clamp-1">
						{author}
					</h3>
					<h4 className="text-sm text-ellipsis d line-clamp-2">
						{description}
					</h4>
				</div>
			</div>
			<div className="text-sm">
				<p className="d">extra info</p>
			</div>
		</div>
	);
};
