import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

interface Props {
	links: {
		name: string;
		url: string;
	}[];
}

const Navbar: React.FC<Props> = ({ links }): JSX.Element => {
	const navigate = useNavigate();
	return (
		<nav className="flex items-center justify-around px-3 mt-1 md:justify-between h-14 sm:px-10">
			<div className="flex items-center h-20 py-6 cursor-pointer">
				{/* <img
					src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
					alt="Keep"
					className="w-full h-full"
				/> */}
				<p
					className="text-2xl font-bold whitespace-nowrap"
					onClick={() => navigate("/")}
				>
					Super Speller
				</p>
			</div>
			<div className="flex items-center justify-end w-1/3 h-full md:w-2/3">
				<div className="flex items-center justify-center mr-20 scale-0 lg:scale-100">
					{links.map((navItem, index) => {
						return (
							<div
								className="flex flex-col items-center justify-center h-full transition-colors cursor-pointer group"
								onClick={() => navigate(navItem.url)}
							>
								<p
									key={index}
									className="px-10 text-xl font-bold transition-colors border-none"
								>
									{navItem.name}
								</p>
								<div className="w-full h-1 transition-all scale-0 bg-blue-400 group-hover:scale-100"></div>
							</div>
						);
					})}
				</div>
				<div className="flex items-center justify-center">
					<button
						className="w-24 h-10 transition-colors bg-blue-500 sm:w-32 rounded-2xl hover:bg-blue-700"
						onClick={() => navigate("/signin")}
					>
						<div className="flex items-center justify-center">
							<FaSignInAlt
								className="inline-block mr-2 text-xl"
								color="white"
							/>
							<p className="hidden font-bold text-white sm:inline-block">
								Sign in
							</p>
						</div>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
