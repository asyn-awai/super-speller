import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
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

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
