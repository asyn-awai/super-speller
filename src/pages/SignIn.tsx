import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { FaEnvelope, FaLock, FaKey, FaCheck, FaTimes } from "react-icons/fa";
import { HiAtSymbol } from "react-icons/hi";
import Navbar from "../components/Navbar";
import db from "../firebase";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

const SignIn: React.FC = (): JSX.Element => {
	const [isUser, setIsUser] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const passwordTests = {
		0: p => !(p.length > 5),
		1: p => !/[a-z]/.test(p),
		2: p => !/[A-Z]/.test(p),
		3: p => !/[1-9]/.test(p),
		4: p => !(p === confirmPassword),
	} as { [key: number]: (p: string) => boolean };
	const testToName = {
		0: "6 characters long",
		1: "one lowercase letter",
		2: "one uppercase letter",
		3: "one number",
		4: "passwords match",
	} as { [key: number]: string };

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
							setUsername={setUsername}
							setEmail={setEmail}
							setPassword={setPassword}
							setConfirmPassword={setConfirmPassword}
							email={email}
							password={password}
							confirmPassword={confirmPassword}
						/>
					</form>
					{!isUser && (
						<div className="flex flex-col w-full gap-5 sm:gap-10 sm:flex-row">
							<div className="w-full">
								<h4 className="font-semibold">
									Username requirements:
								</h4>
								<ul>
									<div className="flex items-center">
										{!(username.length >= 3) ? (
											<FaTimes
												color="red"
												className="mr-1"
											/>
										) : (
											<FaCheck
												color="green"
												className="mr-1"
											/>
										)}
										<li className="text-sm text-gray-400">
											At least 3 characters
										</li>
									</div>
								</ul>
								<br />
								<h4 className="font-semibold">
									Other requirements:
								</h4>
								<ul>
									<div className="flex items-center">
										{!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
											email.toLowerCase()
										) ? (
											<FaTimes
												color="red"
												className="mr-1"
											/>
										) : (
											<FaCheck
												color="green"
												className="mr-1"
											/>
										)}
										<li className="text-sm text-gray-400">
											Valid email
										</li>
									</div>
								</ul>
							</div>
							<div className="w-full">
								<h4 className="font-semibold">
									Password requirements:
								</h4>

								<ul>
									{[0, 1, 2, 3, 4].map(i => {
										const res = passwordTests[i](password);
										return (
											<div className="flex items-center">
												{res ? (
													<FaTimes
														color="red"
														className="mr-1"
													/>
												) : (
													<FaCheck
														color="green"
														className="mr-1"
													/>
												)}
												<li className="text-sm text-gray-400">
													{testToName[i]}
												</li>
											</div>
										);
									})}
								</ul>
							</div>
						</div>
					)}
					<div className="flex flex-col items-center justify-center">
						<div className="flex items-center justify-center w-full pb-5 border-b-2 border-gray-200">
							<button
								className="w-32 p-2 mt-4 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-700"
								onClick={e =>
									validateLogin(
										e,
										username,
										email,
										password,
										confirmPassword
									)
								}
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

interface IFieldInput {
	fieldName: "username" | "email" | "password" | "confirm password";
	setter: StateSetter<string>;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

const FieldInput: React.FC<IFieldInput> = ({
	fieldName,
	setter,
	email,
	password,
	confirmPassword,
}): JSX.Element => {
	const iconMap = {
		username: <HiAtSymbol color="gray" />,
		email: <FaEnvelope color="gray" />,
		password: <FaLock color="gray" />,
		"confirm password": <FaKey color="gray" />,
	};
	const placeholderMap = {
		username: "Creative username here",
		email: "Your email",
		password: "Secure password",
		"confirm password": "Confirm password",
	};

	return (
		<div className="w-full">
			<label
				htmlFor={`${fieldName}group`}
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{fieldName === "confirm password"
					? "Confirm Password"
					: fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
			</label>

			<div className="flex w-full h-auto">
				<div className="relative w-full mb-6">
					<span className="absolute inset-y-0 left-0 flex items-center px-3 pl-3 font-bold pointer-events-none">
						{iconMap[fieldName]}
					</span>
					<input
						type={
							fieldName === "password" ||
							fieldName === "confirm password"
								? "password"
								: "text"
						}
						id={`${fieldName}group`}
						className="w-full input-form"
						onChange={e => setter(e.target.value)}
						placeholder={placeholderMap[fieldName]}
					/>
				</div>
			</div>
		</div>
	);
};

interface FieldsProps {
	isUser: boolean;
	setUsername: StateSetter<string>;
	setEmail: StateSetter<string>;
	setPassword: StateSetter<string>;
	setConfirmPassword: StateSetter<string>;
	email: string;
	password: string;
	confirmPassword: string;
}

const Fields: React.FC<FieldsProps> = ({
	isUser,
	setUsername,
	setEmail,
	setPassword,
	setConfirmPassword,
	email,
	password,
	confirmPassword,
}): JSX.Element => {
	if (isUser) {
		return (
			<>
				<div className="flex flex-col items-center justify-center w-full">
					<FieldInput fieldName="email" setter={setEmail} />
					<FieldInput fieldName="password" setter={setPassword} />
				</div>
			</>
		);
	}
	return (
		<>
			<div className="flex flex-col items-center justify-center w-full">
				<FieldInput fieldName="username" setter={setUsername} />
				<FieldInput fieldName="email" setter={setEmail} email={email} />
			</div>
			<div className="flex flex-col items-center justify-center w-full">
				<FieldInput
					fieldName="password"
					setter={setPassword}
					password={password}
				/>
				<FieldInput
					fieldName="confirm password"
					setter={setConfirmPassword}
				/>
			</div>
		</>
	);
};

async function validateLogin(
	e: any,
	username: string,
	email: string,
	password: string,
	confirmPassword: string
) {
	e.preventDefault();
	try {
		if (
			!username ||
			!email ||
			!password ||
			!confirmPassword ||
			password !== confirmPassword
		) {
			throw new Error("Invalid input");
		}
		const queryRes = await getDocs(
			query(collection(db, "user-data"), where("email", "==", email))
		);
		if (queryRes.size > 0) {
			throw new Error("Email already in use");
		}
		await addDoc(collection(db, "user-data"), {
			username,
			email,
			password,
		});
		alert("success");
	} catch (error) {
		alert(error);
	}
}
