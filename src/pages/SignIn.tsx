import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { HiAtSymbol } from "react-icons/hi";
import Navbar from "../components/Navbar";
import db from "../firebase";

const SignIn: React.FC = (): JSX.Element => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	useEffect(() => {
		console.log([username, email, password]);
	}, [username, email, password]);
	return (
		<div className="flex flex-col">
			<Navbar links={[{ name: "Home", url: "/" }]} />
			<div className="min-h-[90vh] flex justify-center items-center grow-1 h-full w-full">
				<div className="items-center justify-center h-auto p-6 bg-white rounded-lg shadow-2xl min-h-96 lg:w-[60%] xl:w-[35%]">
					<h1 className="text-2xl font-bold text-center">Sign Up</h1>
					<br />
					<form className="flex flex-col md:gap-10 md:flex-row">
						<div className="flex flex-col items-center justify-center w-full">
							<FieldInput
								fieldName="username"
								setter={setUsername}
							/>
							<FieldInput fieldName="email" setter={setEmail} />
						</div>
						<div className="flex flex-col items-center justify-center w-full">
							<FieldInput
								fieldName="password"
								setter={setPassword}
							/>
							<FieldInput
								fieldName="confirm password"
								setter={setConfirmPassword}
							/>
						</div>
					</form>
					<div className="flex flex-col items-center justify-center">
						<div className="flex items-center justify-center w-full pb-5 border-b-2 border-gray-200">
							<button
								className="p-2 mt-4 text-white bg-blue-500 hover:bg-blue-700 transition-colors rounded-lg w-[60%] md:w-[30%]"
								onClick={async e => {
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
											query(
												collection(db, "user-data"),
												where("email", "==", email)
											)
										);
										if (queryRes.size > 0) {
											throw new Error(
												"Email already in use"
											);
										}
										await addDoc(
											collection(db, "user-data"),
											{
												username,
												email,
												password,
											}
										);
									} catch (error) {
										alert(error);
									}
								}}
							>
								Sign Up
							</button>
						</div>
						<p className="mt-4 text-gray-400 text-md">
							Already have an account?{" "}
							<a
								href="/signin"
								className="font-bold text-blue-500 hover:text-blue-700"
							>
								Sign In
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

interface IFieldInput {
	fieldName: "username" | "email" | "password" | "confirm password";
	setter: React.Dispatch<React.SetStateAction<string>>;
}

const FieldInput: React.FC<IFieldInput> = ({
	fieldName,
	setter,
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

			<div className="relative mb-6">
				<span className="absolute inset-y-0 left-0 flex items-center px-3 pl-3 font-bold pointer-events-none">
					{iconMap[fieldName]}
				</span>
				<input
					type={fieldName === "password" ? "password" : "text"}
					id={`${fieldName}group`}
					className="input-form"
					onChange={e => setter(e.target.value)}
					placeholder={placeholderMap[fieldName]}
				/>
			</div>
		</div>
	);
};
