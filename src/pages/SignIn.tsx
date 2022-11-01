import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Requirements from "../components/SignIn/Requirements";
import Fields from "../components/SignIn/Fields";
import db from "../firebase";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	const navigate = useNavigate();

	/**
	 * true -> signing in
	 * false -> signing up
	 */
	const [isUser, setIsUser] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const usernameField = useRef<HTMLInputElement>(null);
	const emailField = useRef<HTMLInputElement>(null);
	const passwordField = useRef<HTMLInputElement>(null);
	const confirmPasswordField = useRef<HTMLInputElement>(null);

	const [validInput, setValidInput] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [loadPage, setLoadPage] = useState(false);

	const onFormSubmit = async (
		e:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		try {
			const userSearch = await getDocs(
				query(
					collection(db, "user-data"),
					where("email", "==", email),
					where("password", "==", password)
				)
			);
			if (!isUser) {
				//signing up
				if (userSearch.size > 0) {
					throw new Error("Email already in use");
				}
				if (!validInput) throw new Error("Invalid input");
				await addDoc(collection(db, "user-data"), {
					username,
					email,
					password,
					savedLists: [],
				});
			} else {
				//signing in
				if (!email || !password)
					throw new Error("Please fill in all fields");
			}
			localStorage.setItem(
				"authUser",
				JSON.stringify({
					username: userSearch.docs[0]?.data()?.username ?? username,
					email,
					password,
					savedLists: [],
				})
			);
			const authUser = JSON.parse(
				localStorage.getItem("authUser") ?? "{}"
			);
			if (!authUser.password || !authUser.email || !authUser.username)
				navigate("/signin");
			await addDoc(collection(db, "mastery"), {
				username: authUser.username,
				email: authUser.email,
				words: [],
			});
			await addDoc(collection(db, "scores"), {
				username: authUser.username,
				email: authUser.email,
				score: 0,
			});
			navigate("/lists");
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		(async () => {
			const authUser = JSON.parse(
				localStorage.getItem("authUser") ?? "{}"
			);
			if (!authUser.password || !authUser.email || !authUser.username) {
				setLoadPage(true);
			} else {
				const matches = await getDocs(
					query(
						collection(db, "user-data"),
						where("username", "==", authUser.username),
						where("email", "==", authUser.email),
						where("password", "==", authUser.password)
					)
				);
				if (matches.size > 0) {
					navigate("/lists");
				} else {
					localStorage.removeItem("authUser");
					setLoadPage(true);
				}
			}
		})();
	}, []);

	return (
		<>
			{loadPage ? (
				<Layout
					navbarProps={[{ name: "Home", url: "/" }]}
					darkMode={darkMode}
					setDarkMode={setDarkMode}
					topNav
				>
					{/* temp fix 94vh for white space */}
					<div className="flex items-center justify-center h-auto sm:h-[94vh] py-10 md:w-screen sm:py-0">
						<div className="items-center justify-center h-auto p-6 bg-white rounded-lg shadow-2xl min-h-96 w-[85%] xl:w-[40rem] dark:bg-gray-800 dark:text-white transition-colors">
							<h1 className="text-2xl font-bold text-center">
								{isUser ? "Sign In" : "Sign Up"}
							</h1>
							<br />
							<form
								className="flex flex-col md:gap-10 md:flex-row"
								onSubmit={e => onFormSubmit(e)}
							>
								<Fields
									isUser={isUser}
									email={email}
									password={password}
									confirmPassword={confirmPassword}
									setUsername={setUsername}
									setEmail={setEmail}
									setPassword={setPassword}
									setConfirmPassword={setConfirmPassword}
									usernameField={usernameField}
									emailField={emailField}
									passwordField={passwordField}
									confirmPasswordField={confirmPasswordField}
								/>
							</form>
							<Requirements
								isUser={isUser}
								username={username}
								email={email}
								password={password}
								confirmPassword={confirmPassword}
								setValidInput={setValidInput}
							/>
							<div className="flex flex-col items-center justify-center">
								<div className="flex items-center justify-center w-full pb-5 border-b-2 border-gray-200">
									<button
										className="w-32 p-2 mt-4 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-700"
										onClick={e => onFormSubmit(e)}
									>
										{isUser ? "Sign In" : "Sign Up"}
									</button>
								</div>
								<p className="mt-4 text-center text-gray-400 text-md">
									{isUser
										? "Don't have an account? "
										: "Already have an account? "}
									<span
										className="font-bold text-blue-500 cursor-pointer hover:text-blue-700"
										onClick={() => {
											setIsUser(prev => !prev);
											setUsername("");
											setEmail("");
											setPassword("");
											setConfirmPassword("");
											setValidInput(false);
											if (usernameField.current)
												usernameField.current.value =
													"";
											if (emailField.current)
												emailField.current.value = "";
											if (passwordField.current)
												passwordField.current.value =
													"";
											if (confirmPasswordField.current)
												confirmPasswordField.current.value =
													"";
										}}
									>
										{isUser ? " Sign Up" : " Sign In"}
									</span>
								</p>
							</div>
						</div>
					</div>
				</Layout>
			) : (
				<div className="grid w-screen h-screen d place-items-center">
					<Spinner />
				</div>
			)}
		</>
	);
};

export default SignIn;

async function validateLogin(
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	username: string,
	email: string,
	password: string,
	// confirmPassword: string,
	validInput: boolean,
	navigate: (path: string) => void
) {
	e.preventDefault();
	try {
		if (!validInput) throw new Error("Invalid input");
		const sameEmail = await getDocs(
			query(collection(db, "user-data"), where("email", "==", email))
		);
		if (sameEmail.size > 0) {
			throw new Error("Email already in use");
		}
		await addDoc(collection(db, "user-data"), {
			username,
			email,
			password,
		});
		alert("success");
		navigate("/lists");
	} catch (error) {
		alert(error);
	}
}
