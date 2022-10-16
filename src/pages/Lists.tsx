import React from "react";
import db from "../firebase";
import Layout from "../components/Layout";
import { FaShare, FaEdit } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lists: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	return (
		<Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
			<br />
			<div className="min-h-screen">
				<div className="flex flex-col h-auto gap-5 mx-2 mb-10">
					<div className="flex items-center justify-start w-full h-36">
						<h1 className="text-2xl font-bold">Your Lists</h1>
					</div>
					<div className="flex flex-wrap items-center justify-evenly sm:basis-1/2">
						<ListCard />
						<ListCard />
						<ListCard />
						<ListCard />
					</div>
				</div>
				<div className="flex flex-col h-auto gap-5 mx-2 mb-10">
					<div className="flex items-center justify-start w-full h-36">
						<h1 className="text-2xl font-bold">Saved Lists</h1>
					</div>
					<div className="flex flex-wrap items-center justify-evenly sm:flex-row md:basis-2">
						<ListCard />
						<ListCard />
						<ListCard />
						<ListCard />
					</div>
				</div>
			</div>
			<br />
		</Layout>
	);
};

export default Lists;

interface LCProps {}

const ListCard: React.FC<LCProps> = (): JSX.Element => {
	return (
		<div className="flex flex-col w-full max-w-xs p-4 m-5 bg-white rounded-lg shadow-md h-96 dark:bg-gray-800 gap-y-2">
			<title className="text-xl font-bold dark:text-white line-clamp-1 d">
				Title
			</title>
			<small>Author</small>
			<img
				src="https://via.placeholder.com/150"
				className="h-[40%] object-cover"
			/>
			<p className="line-clamp-4">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
				quod praesentium rerum consequatur ab a at sapiente temporibus
				id, ut sunt debitis nobis soluta iste delectus incidunt. Minus,
				repellat facilis!
			</p>
			<Options editable shareable />
		</div>
	);
};

interface OptionsProps {
	editable: boolean;
	shareable: boolean;
}

const Options: React.FC<OptionsProps> = ({
	editable,
	shareable,
}): JSX.Element => {
	const OptionButton: React.FC<{ icon: JSX.Element; title: string }> = ({
		icon,
		title,
	}): JSX.Element => {
		return (
			<button
				title={title}
				className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700"
			>
				{icon}
			</button>
		);
	};
	return (
		<div className="flex justify-between">
			<div className="flex gap-3">
				{editable && (
					<OptionButton
						icon={<FaEdit color={"white"} />}
						title="edit"
					/>
				)}
				{shareable && (
					<OptionButton
						icon={<FaShare color={"white"} />}
						title="share"
					/>
				)}
			</div>
			<OptionButton icon={<MdQuiz color={"white"} />} title="quiz" />
		</div>
	);
};
