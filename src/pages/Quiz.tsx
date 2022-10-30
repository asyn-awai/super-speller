import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import {
	FaArrowLeft,
	FaArrowRight,
	FaRedoAlt,
	FaCheck,
	FaVolumeUp,
	FaEdit,
} from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface Word {
	word: string;
	definition: string;
	example: string | null;
}

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quiz: React.FC<Props> = ({ darkMode, setDarkMode }) => {
	/**
	 * @TODO fix audio when changing progress not correct
	 */
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const [quizStart, setQuizStart] = useState(false);
	const listId = location.pathname.split("/").pop();
	const [listTitle, setListTitle] = useState<string>();
	const [listData, setListData] = useState<Word[]>([]);
	// const [currentWord, setCurrentWord] = useState<Word>({} as Word);
	const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
	const [wordsToInputs, setWordsToInputs] = useState<{
		[key: string]: string;
	}>({});
	const [showResults, setShowResults] = useState<boolean>(false);

	const tts = (text: string | null | undefined) => {
		if (text === null || text === undefined) return;
		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(utterance);
	};

	useEffect(() => {
		const authUser = JSON.parse(localStorage.getItem("authUser") ?? "{}");
		(async () => {
			const listQuery = await getDocs(
				query(
					collection(db, "lists"),
					where("listId", "==", listId),
					where("authorUsername", "==", authUser.username)
				)
			);
			if (listQuery.size === 0) {
				navigate("/lists");
				alert(
					"The list you are trying to access does not exist, or you do not have permission to access it."
				);
				return;
			}
			setListTitle(listQuery.docs[0].data().listTitle);
			if (listData.length === 0) {
				setListData(
					listQuery.docs[0]
						.data()
						.listContent.sort(() => 0.5 - Math.random())
				);
			}
			for (const word of listQuery.docs[0].data().listContent) {
				setWordsToInputs(prev => {
					prev[word.word] = prev[word.word] ? prev[word.word] : "";
					return prev;
				});
			}
			setLoading(false);
		})();
	}, []);

	return (
		<Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
			<div className="min-h-screen h-auto flex flex-col gap-5 mx-2">
				{!loading && (
					<>
						{quizStart ? (
							<>
								<div className="flex items-center justify-start w-full h-36">
									<h1 className="text-6xl font-bold">
										{listTitle}
									</h1>
								</div>
								<div
									className={`flex flex-col items-center justify-center h-full ${
										currentWordIndex >= listData.length &&
										"my-24"
									}`}
								>
									<div className="w-3/4 flex h-full flex-col items-center justify-center">
										{currentWordIndex !==
										listData.length ? (
											<InputSection
												listData={listData}
												tts={tts}
												currentWordIndex={
													currentWordIndex
												}
												setCurrentWordIndex={
													setCurrentWordIndex
												}
												wordsToInputs={wordsToInputs}
												setWordsToInputs={
													setWordsToInputs
												}
											/>
										) : showResults ? (
											<ResultsSection
												listData={listData}
												wordsToInputs={wordsToInputs}
												tts={tts}
											/>
										) : (
											<ReviewSection
												listData={listData}
												wordsToInputs={wordsToInputs}
												tts={tts}
												setCurrentWordIndex={
													setCurrentWordIndex
												}
												showResults={showResults}
												setShowResults={setShowResults}
											/>
										)}
									</div>
								</div>
							</>
						) : (
							<div className="justify-center flex flex-col items-center h-full gap-10 flex-1">
								<h1 className="text-6xl font-bold">
									{listTitle}
								</h1>
								<div
									role="button"
									className="btn p-3"
									onClick={() => {
										setQuizStart(true);
										tts(listData[currentWordIndex].word);
									}}
								>
									<p className="btn-text">Start Quiz</p>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</Layout>
	);
};

export default Quiz;

const InputSection: React.FC<{
	listData: Word[];
	tts: (text: string | null | undefined) => void;
	currentWordIndex: number;
	setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
	wordsToInputs: { [key: string]: string };
	setWordsToInputs: React.Dispatch<
		React.SetStateAction<{ [key: string]: string }>
	>;
}> = ({
	listData,
	tts,
	currentWordIndex,
	setCurrentWordIndex,
	wordsToInputs,
	setWordsToInputs,
}): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState<string>("");
	const handleProgress = (type: "back" | "next") => {
		setWordsToInputs(prev => {
			prev[listData[currentWordIndex].word] = inputValue;
			return prev;
		});
		if (type === "next") {
			if (inputValue === "") return;
			setCurrentWordIndex(prev => prev + 1);
		} else {
			if (currentWordIndex === 0) return;
			setCurrentWordIndex(prev => prev - 1);
		}
	};
	useEffect(() => {
		setInputValue(wordsToInputs[listData[currentWordIndex]?.word] ?? "");
		if (inputRef.current === null) return;
		inputRef.current.value =
			wordsToInputs[listData[currentWordIndex]?.word] ?? "";
		inputRef.current.focus();
		tts(listData[currentWordIndex].word);
	}, [currentWordIndex]);

	return (
		<>
			<h1 className="text-center font-bold text-xl">
				Type in the word you hear!
			</h1>
			<form
				className="w-full my-10 h-24"
				onSubmit={e => {
					e.preventDefault();
					handleProgress("next");
				}}
			>
				<input
					ref={inputRef}
					onChange={e => setInputValue(e.target.value)}
					className="w-full bg-gray-50 border placeholder:text-3xl border-gray-300 text-gray-900 text-5xl font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 px-5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
				/>
			</form>
			<div className="flex w-full lg:flex-row flex-col justify-center items-center gap-5">
				<div className="flex gap-5">
					<div
						role="button"
						className="btn p-3"
						onClick={() => tts(listData[currentWordIndex].word)}
					>
						<FaRedoAlt size={25} color="white" className="mr-3" />
						<p className="btn-text">Repeat Word</p>
					</div>
					<div
						role="button"
						className="btn p-3"
						onClick={() => tts(listData[currentWordIndex].example)}
					>
						<FaRedoAlt size={25} color="white" className="mr-3" />
						<p className="btn-text">Repeat Example</p>
					</div>
				</div>
				<div className="flex gap-5">
					<div
						role="button"
						className={`btn-no-bg p-3 ${
							currentWordIndex === 0
								? "bg-gray-500 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600"
						}`}
						onClick={() => handleProgress("back")}
					>
						<FaArrowLeft size={25} color="white" className="mr-3" />
						<p className="btn-text">Back</p>
					</div>
					<div
						role="button"
						className={`btn-no-bg p-3 ${
							inputValue.length === 0
								? "bg-gray-500 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600"
						}`}
						onClick={() => handleProgress("next")}
					>
						<FaArrowRight
							size={25}
							color="white"
							className="mr-3"
						/>
						<p className="btn-text">Next</p>
					</div>
				</div>
				<div>
					<p className="text-2xl font-bold">
						{currentWordIndex + 1} / {listData.length}
					</p>
				</div>
			</div>
		</>
	);
};

const ReviewSection: React.FC<{
	listData: Word[];
	wordsToInputs: { [key: string]: string };
	tts: (text: string | null | undefined) => void;
	setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
	showResults: boolean;
	setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
	listData,
	wordsToInputs,
	tts,
	setCurrentWordIndex,
	showResults,
	setShowResults,
}): JSX.Element => {
	const handleSubmit = () => {
		setShowResults(true);
	};
	return (
		<>
			<h1 className="text-center font-bold text-xl mb-8">
				Great job! Click to edit or submit when you're done
			</h1>
			<div role="button" className="btn mb-8 p-3" onClick={handleSubmit}>
				<FaCheck size={25} color="white" className="mr-3" />
				<p className="btn-text">Submit</p>
			</div>
			{listData.map((word, index) => (
				<WordCard
					word={wordsToInputs[word.word]}
					correctWord={word.word}
					tts={tts}
					index={index}
					setCurrentWordIndex={setCurrentWordIndex}
					showDiff={showResults}
				/>
			))}
		</>
	);
};

const ResultsSection: React.FC<{
	listData: Word[];
	wordsToInputs: { [key: string]: string };
	tts: (word: string | null | undefined) => void;
}> = ({ listData, wordsToInputs, tts }): JSX.Element => {
	const navigate = useNavigate();
	const numCorrect = Object.entries(wordsToInputs).reduce(
		(a, [word, attempted]) => a + +(word === attempted),
		0
	);
	const getCompliment = () => {
		const len = listData.length;
		if (numCorrect === len) return "Perfect score!";
		if (numCorrect >= len * 0.9) return "Excellent work!";
		if (numCorrect >= len * 0.6) {
			return `${numCorrect >= len * 0.8 ? "Great" : "Good"} job!`;
		}
		return "Better luck next time!";
	};
	return (
		<>
			<h1 className="text-center font-bold text-xl mb-8">
				{`${getCompliment()} You scored `}
				<span className="text-xl font-bold text-center mb-8 text-blue-400">
					{Math.floor((numCorrect / listData.length) * 100)}%
				</span>
			</h1>
			<div
				role="button"
				className="btn mb-8 p-3"
				onClick={() => navigate("/lists")}
			>
				<FaArrowLeft size={25} color="white" className="mr-3" />
				<p className="btn-text">Back to Lists</p>
			</div>
			{listData.map((word, index) => (
				<WordCard
					word={wordsToInputs[word.word]}
					correctWord={word.word}
					tts={tts}
					index={index}
					setCurrentWordIndex={() => {}}
					showDiff
				/>
			))}
		</>
	);
};

const WordCard: React.FC<{
	word: string;
	correctWord: string;
	tts: (text: string | null | undefined) => void;
	index: number;
	setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
	showDiff?: boolean;
}> = ({
	word,
	correctWord,
	tts,
	index,
	setCurrentWordIndex,
	showDiff = false,
}): JSX.Element => {
	return (
		<div className="pl-14 pr-8 h-16 flex items-center rounded-lg transition-colors dark:bg-gray-700 bg-gray-100 w-full p-2 gap-5 mb-4 cursor-pointer dark:border-none border">
			<h2 className="w-8 text-xl">{`${index + 1}.`}</h2>
			<div className="flex justify-between items-center w-full">
				<div>
					{showDiff && word !== correctWord ? (
						<>
							<span className="font-bold text-2xl text-gray-400">
								{word}
							</span>
							<span className="font-bold text-2xl text-blue-400">{` ➜ ${correctWord}`}</span>
						</>
					) : (
						<span className="font-bold text-2xl text-blue-400">
							{word}
						</span>
					)}
				</div>
				{!showDiff && (
					<div className="flex gap-8">
						<div
							role="button"
							className="btn p-2"
							onClick={() => {
								setCurrentWordIndex(index);
								tts(correctWord);
							}}
						>
							<FaEdit size={25} color="white" className="mr-3" />
							<span className="btn-text">Edit</span>
						</div>
						<div
							role="button"
							className="btn p-2"
							onClick={() => tts(correctWord)}
						>
							<FaVolumeUp
								size={25}
								color="white"
								className="mr-3"
							/>
							<span className="btn-text">Listen</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
