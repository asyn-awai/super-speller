import React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = (): JSX.Element => {
	return (
		<>
			<Navbar
				links={[
					{ name: "Home", url: "/" },
					{ name: "About", url: "/about" },
					{ name: "Contact", url: "/contact" },
				]}
			/>
			<Landing />
		</>
	);
};

export default Home;

const Landing: React.FC = (): JSX.Element => {
	return (
		<div className="h-[90vh] flex p-5 md:p-14 xl:px-28 flex-col items-center justify-between xl:flex-row">
			<div className="h-[90%] flex flex-col justify-center xl:max-w-[36rem]">
				<p className="text-5xl font-bold text-center xl:text-left">
					<span className="text-5xl font-bold text-blue-500">
						Expand
					</span>{" "}
					Your Vocabulary
				</p>
				<br />
				<p className="text-xl font-bold text-center xl:text-left">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Fuga itaque explicabo corporis, perspiciatis quae
					exercitationem nostrum sit ullam voluptates natus optio
					officia eaque quaerat, minima commodi maxime nesciunt ab
					architecto!
				</p>
			</div>
			<div className="flex items-center justify-center">
				<img src="https://st.depositphotos.com/1001069/1935/i/450/depositphotos_19359867-stock-photo-computer-display.jpg" />
			</div>
		</div>
	);
};
