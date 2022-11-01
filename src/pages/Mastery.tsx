import { collection, getDocs, query, where } from "firebase/firestore";
import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import db from "../firebase";

interface Word {
	word: string;
	level: number;
}

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Mastery: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [words, setWords] = useState<Word[]>([]);
	useEffect(() => {
		(async () => {
			const authUser = JSON.parse(
				localStorage.getItem("authUser") ?? "{}"
			);
			if (!authUser.password || !authUser.email || !authUser.username)
				navigate("/signin");
			const querySnapshot = await getDocs(
				query(
					collection(db, "mastery"),
					where("email", "==", authUser.email),
					where("username", "==", authUser.username)
				)
			);
			if (querySnapshot.docs.length === 0) {
				setLoading(false);
				return;
			}
			setWords(
				querySnapshot.docs
					.map(doc => doc.data().words)
					.sort((a, b) => a.level - b.level)
					.flat()
			);
			setLoading(false);
		})();
	}, []);
	return (
		<Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
			<div className="min-h-screen">
				{!loading ? (
					<div className="flex flex-col h-auto gap-5 mx-2 mb-10">
						<div className="flex items-center justify-start w-full h-36">
							<h1 className="text-6xl font-bold">Mastery</h1>
						</div>
						<div className="w-full flex justify-center">
							<div className="flex flex-col w-3/4">
								<MasteryHeader />
								<br />
								<MasteryItems words={words} />
							</div>
						</div>
					</div>
				) : (
					<Spinner />
				)}
			</div>
		</Layout>
	);
};

export default Mastery;

const MasteryHeader: React.FC = (): JSX.Element => {
	return (
		<div className="px-14 h-16 flex items-center rounded transition-colors dark:bg-gray-700 bg-gray-100">
			<div className="flex justify-center w-[50%]">
				<strong className="text-lg">Word</strong>
			</div>
			<div className="flex justify-center w-[50%]">
				<strong className="text-lg">Level</strong>
			</div>
		</div>
	);
};

const MasteryItems: React.FC<{
	words: Word[];
}> = ({ words }): JSX.Element => {
	const sortedWords = () =>
		words.sort((a, b) => {
			if (a.level === b.level) {
				return a.word.localeCompare(b.word);
			}
			return b.level - a.level;
		});
	return (
		<div className="flex flex-col w-full">
			{sortedWords().map(word => (
				<div
					key={nanoid()}
					className="px-14 h-16 flex items-center rounded transition-colors dark:bg-gray-700 bg-gray-100 mb-2"
				>
					<div className="flex justify-center w-[50%]">
						<strong className="text-lg">{word.word}</strong>
					</div>
					<div className="flex justify-center w-[50%]">
						<LevelIndicator level={word.level} />
					</div>
				</div>
			))}
		</div>
	);
};

const LevelIndicator: React.FC<{ level: number }> = ({
	level,
}): JSX.Element => {
	const getPercentage = () => {
		if (level >= 100) return 5;
		if (level >= 80) return 4;
		if (level >= 60) return 3;
		if (level >= 40) return 2;
		if (level >= 20) return 1;
		return 0;
	};
	return (
		// 5 circle divs that are either filled or not filled
		<div key={nanoid()} className="flex items-center gap-3">
			{[...Array(5)].map((_, i) => (
				<FaCircle
					key={nanoid()}
					size={(i + 4) ** 1.5 + 5}
					color={
						i < getPercentage()
							? "rgb(59 130 246)"
							: "rgb(156 163 175)"
					}
				/>
			))}
		</div>
	);
};
