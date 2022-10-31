import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Layout from "../components/Layout";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import Spinner from "../components/Spinner";

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LeaderboardItem {
	rank: number;
	username: string;
	score: number;
}

interface User {
	email: string;
	username: string;
	score: number;
}

const Leaderboard: React.FC<Props> = ({
	darkMode,
	setDarkMode,
}): JSX.Element => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		(async () => {
			const authUser = JSON.parse(
				localStorage.getItem("authUser") ?? "{}"
			);
			if (!authUser.password || !authUser.email || !authUser.username)
				navigate("/signin");
			const querySnapshot = await getDocs(
				query(collection(db, "scores"))
			);
			if (querySnapshot.docs.length === 0) return;
			setUsers(
				querySnapshot.docs
					.map(doc => doc.data())
					.sort((a, b) => b.score - a.score) as User[]
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
							<h1 className="text-6xl font-bold">Leaderboard</h1>
						</div>
						<div className="w-full flex justify-center">
							<div className="flex flex-col w-3/4">
								<LeaderboardHeader />
								<br />
								<LeaderboardItems users={users} />
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

export default Leaderboard;

const LeaderboardHeader: React.FC = (): JSX.Element => {
	return (
		<div className="px-14 h-16 flex items-center rounded transition-colors dark:bg-gray-700 bg-gray-100">
			<div className="flex w-[25%]">
				<strong className="text-lg">Rank</strong>
			</div>
			<div className="flex justify-center w-[50%]">
				<strong className="text-lg">Username</strong>
			</div>
			<div className="flex justify-end w-[25%]">
				<strong className="text-lg">Score</strong>
			</div>
		</div>
	);
};

const LeaderboardItems: React.FC<{
	users: User[];
}> = ({ users }): JSX.Element => {
	const Item: React.FC<{ user: User; index: number }> = ({ user, index }) => {
		const rankColors = {
			1: "gold",
			2: "silver",
			3: "brown",
		} as { [key: number]: string };
		return (
			<div className="px-14 h-16 flex items-center rounded transition-colors dark:bg-gray-700 bg-gray-100 mb-2">
				<div className="flex items-center gap-2 w-[25%]">
					<FaTrophy
						size={25}
						color={rankColors[index + 1]}
						style={{
							visibility:
								index + 1 in rankColors ? "visible" : "hidden",
						}}
					/>
					<span className="text-lg font-bold">{index + 1}</span>
				</div>
				<div className="flex justify-center w-[50%]">
					<strong className="text-lg">{user.username}</strong>
				</div>
				<div className="flex justify-end w-[25%]">
					<strong className="text-lg">{user.score}</strong>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col w-full">
			{users.map((user, index) => (
				<Item user={user} index={index} key={nanoid()} />
			))}
		</div>
	);
};
