import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Requirements from "../components/SignIn/Requirements";
import Fields from "../components/SignIn/Fields";
import db from "../firebase";

const SignIn: React.FC = (): JSX.Element => {
	const navigate = useNavigate();
    
	const [isUser, setIsUser] = useState(false);
    const [validInput, setValidInput] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<>
			<Navbar links={[{ name: "Home", url: "/" }]} />
			<div className="min-h-[90vh] flex justify-center items-center h-full w-full">
				<div className="items-center justify-center h-auto p-6 bg-white rounded-lg shadow-2xl min-h-96 w-[80%] xl:w-[40rem]">
					<h1 className="text-2xl font-bold text-center">
						{isUser ? "Sign In" : "Sign Up"}
					</h1>
					<br />
					<form className="flex flex-col md:gap-10 md:flex-row">
						<Fields
							isUser={isUser}
							email={email}
							password={password}
							confirmPassword={confirmPassword} 
							setUsername={setUsername}
							setEmail={setEmail}
							setPassword={setPassword}
							setConfirmPassword={setConfirmPassword}
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
								onClick={async e => {
                                    e.preventDefault();
                                    try {
                                        if (!validInput) throw new Error("Invalid input");
                                        const sameEmail = await getDocs(
                                            query(collection(db, "user-data"), 
                                                  where("email", "==", email))
                                        );
                                        if (sameEmail.size > 0) {
                                            throw new Error("Email already in use");
                                        }
                                        await addDoc(collection(db, "user-data"), {
                                            username,
                                            email,
                                            password,
                                        });
                                        navigate('/dashboard');
                                    } catch (error) {
                                        alert(error);
                                    }
                                }}
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
								}}
							>
								{isUser ? " Sign Up" : " Sign In"}
							</span>
						</p>
					</div>
				</div>
			</div>
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
			query(collection(db, "user-data"), 
                  where("email", "==", email))
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
        navigate('/dashboard');
	} catch (error) {
		alert(error);
	}
}
