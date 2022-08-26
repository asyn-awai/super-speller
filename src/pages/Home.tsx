import React from "react";
import Navbar from "../components/Navbar";

import { FaThList, FaGraduationCap, FaShare } from "react-icons/fa";
import PCImage from "../assets/pc-image.png";
import CodingImage from "../assets/coding.png";
import CodingImage1 from "../assets/coding-1.png";

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
			<GetStarted />
		</>
	);
}

export default Home;

const Landing: React.FC = (): JSX.Element => {
	return (
		<section>
			<div className="min-h-[95vh] h-auto flex p-5 md:p-14 xl:px-28 flex-col items-center justify-between xl:flex-row">
				<div className="min-h-[90%] h-auto flex flex-col justify-center xl:max-w-[36rem] mb-10">
					<p className="text-5xl font-bold text-center xl:text-left">
						<span className="text-5xl font-bold text-blue-500">
							Expand
						</span>{" "}
						Your Vocabulary.
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
				<div className="flex items-center justify-center w-[80%] md:w-[40%] h-full mb-10 md:mb-0">
					{/* <img src="https://t4.ftcdn.net/jpg/04/36/24/89/360_F_436248995_Uhq8fBPXYgUNa4ewT8BhPaZi19irvJsF.jpg" /> */}
                    <img src={CodingImage} />
				</div>
			</div>
		</section>
	);
};

const GetStarted: React.FC = (): JSX.Element => {
	const Card: React.FC<{
		header: string;
		image: React.ReactNode;
		text: string;
	}> = ({ header, image, text }): JSX.Element => {
		return (
			<div className="flex flex-col items-center w-64 p-5 mb-8 bg-white shadow-xl h-72 rounded-xl lg:mb-1">
				<div className="h-auto min-h-3">
					<strong className="text-xl">{header}</strong>
				</div>
				<br />
				<div className="h-auto min-h-10">{image}</div>
				<br />
				<div className="h-auto text-center min-h-5">
					<p className="font-medium">{text}</p>
				</div>
			</div>
		);
	};

	return (
		<section>
			<h1 className="text-3xl font-bold text-center">What can you do?</h1>
			<div className="min-h-[75vh] h-auto py-1 p-5 px-10 md:px-24 md:p-14 flex flex-col lg:flex-row items-center justify-between md:justify-around">
				<Card
					header="Create a list"
					image={<FaThList color="#3b82f6" size={80} />}
					text="Easily select from a wide variety of spelling lists or create your own"
				/>
				<Card
					header="Test your skills"
					image={<FaGraduationCap color="#3b82f6" size={90} />}
					text="Use lists to test your spelling and boost your profile score"
				/>
				<Card
					header="Share your creations"
					image={<FaShare color="#3b82f6" size={80} />}
					text="Create and share lists with others, works great for teachers"
				/>
			</div>
		</section>
	);
};
