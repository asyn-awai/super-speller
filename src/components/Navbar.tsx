import React from "react";

interface Props {
	links: {
		name: string;
		url: string;
	}[];
}

const Navbar: React.FC<Props> = ({ links }): JSX.Element => {
	return (
		<nav className="flex justify-between items-center h-[6vh] px-10">
			<div className="flex items-center h-20 py-6">
				{/* <img
					src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
					alt="Keep"
					className="w-full h-full"
				/> */}
				<p className="text-2xl font-bold whitespace-nowrap">Super Speller</p>
			</div>
			<div className="flex items-center justify-end w-2/3 h-full">
				<div className="flex items-center justify-center mr-20 scale-0 lg:scale-100">
					{links.map((link, index) => {
						return (
							<div className="flex flex-col items-center justify-center h-full transition-colors group">
								<a
									href={link.url}
									key={index}
									className="px-10 text-xl font-bold transition-colors border-none"
								>
									{link.name}
								</a>
								<div className="w-full h-1 overflow-hidden transition-all scale-0 bg-blue-400 border group-hover:scale-100"></div>
							</div>
						);
					})}
				</div>
				<div className="flex items-center justify-center">
					<button className="w-32 h-10 transition-colors bg-blue-500 rounded-2xl hover:bg-blue-700">
						<p className="font-bold text-white">Sign in</p>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
