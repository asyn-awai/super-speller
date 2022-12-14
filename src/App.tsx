import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Lists from "./pages/lists/Lists";
import Create from "./pages/lists/Create";
import Leaderboard from "./pages/Leaderboard";
import Mastery from "./pages/Mastery";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
//https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/#:~:text=To%20integrate%20Firebase%20into%20our,Firebase%20in%20our%20react%20app.&text=Copy%20the%20config%20to%20the,console%20to%20complete%20the%20process.
import { collection, DocumentData, getDocs } from "firebase/firestore";
import db from "./firebase";

function App() {
	const [users, setUsers] = useState<DocumentData>([]);
	// useEffect(() => {
	// 	const getUsers = async () => {
	// 		const usersCollection = collection(db, "user-data");
	// 		const usersSnapshot = await getDocs(usersCollection);
	// 		console.log(usersSnapshot.docs);
	// 		const usersList = usersSnapshot.docs.map(doc => ({
	// 			...doc.data(),
	// 			id: doc.id,
	// 		}));
	// 		setUsers(usersList);
	// 		console.log(users);
	// 	};
	// 	getUsers();
	// }, []);

	const [darkMode, setDarkMode] = useState(
		localStorage.getItem("darkMode") === "true"
	);

	// useEffect(() => {
	// 	const user = localStorage.getItem("authUser");
	// 	if (user) {
	// 		try {
	// 			setAuthUser(JSON.parse(user));
	// 		} catch (e) {
	// 			console.error("Error parsing JSON, clearing local storage");
	// 			localStorage.clear();
	// 		}
	// 	}
	// }, []);

	useEffect(() => {
		//set the dark mode class on the root element and update the local storage
		const root = document.documentElement as HTMLElement;
		if (darkMode) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		localStorage.setItem("darkMode", darkMode.toString());
	}, [darkMode]);

	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					<Route
						path="/signin"
						element={
							<SignIn
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					{/* <Route
						path="/dashboard"
						element={
							<Dashboard
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/> */}
					<Route
						path="/lists/create/*"
						element={
							<Create
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					<Route
						path="/lists"
						element={
							<Lists
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					<Route
						path="/leaderboard"
						element={
							<Leaderboard
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					<Route
						path="/mastery"
						element={
							<Mastery
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					<Route
						path="/quiz/*"
						element={
							<Quiz
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					<Route
						path="/profile/*"
						element={
							<Profile
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
