import React from "react";
import Layout from "../components/Layout";

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quiz: React.FC<Props> = ({ darkMode, setDarkMode }) => {
	return (
		<Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
			<div className="min-h-screen h-auto flex flex-col gap-5 mx-2">
				<div className="flex items-center justify-start w-full h-36">
					<h1 className="text-6xl font-bold">Quiz</h1>
				</div>
				<div className="flex flex-col items-center justify-center h-full">
					<div className="w-3/4 flex h-full flex-col items-center justify-center">
						<h1 className="text-center font-bold text-xl">
							Type in the word you hear!
						</h1>
						<input className="w-full my-10 h-24 bg-gray-50 border placeholder:text-3xl border-gray-300 text-gray-900 text-5xl font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 px-5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all" />
						<div className="flex w-full justify-end items-center px-10">
                            
                        </div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Quiz;
