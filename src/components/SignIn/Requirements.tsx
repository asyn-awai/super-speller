import React, { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Props {
	isUser: boolean;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	setValidInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const Requirements: React.FC<Props> = ({
	isUser,
	username,
	email,
	password,
	confirmPassword,
	setValidInput,
}): JSX.Element => {
	const passwordTests = {
		0: p => !(p.length > 5),
		1: p => !/[a-z]/.test(p),
		2: p => !/[A-Z]/.test(p),
		3: p => !/[1-9]/.test(p),
		4: p => !(p === confirmPassword),
	} as { [key: number]: (p: string) => boolean };
	const passwordTestToDescription = {
		0: "6 characters long",
		1: "one lowercase letter",
		2: "one uppercase letter",
		3: "one number",
		4: "passwords match",
	} as { [key: number]: string };
	const usernameTests = {
		0: u => !(u.length >= 3),
	} as { [key: number]: (p: string) => boolean };
	const usernameTestToDescription = {
		0: "At least 3 characters",
	} as { [key: number]: string };
	const emailTest = (e: string) => !EMAIL_REGEX.test(e.toLowerCase());

	useEffect(() => {
		for (const test in passwordTests) {
			// if (passwordTests[test](password)) {
			//     setValidInput(true);
			// }
			setValidInput(!passwordTests[test](password));
		}
		if (password !== confirmPassword) {
			setValidInput(false);
			return;
		}
		for (const test in usernameTests) {
			// if (!usernameTests[test](username)) {
			//     setValidInput(false);
			//     return;
			// }
			setValidInput(!usernameTests[test](username));
		}
		if (emailTest(email)) {
			setValidInput(false);
			return;
		}
	}, [username, email, password, confirmPassword]);

	return !isUser ? (
		<div className="flex flex-col w-full gap-5 sm:gap-10 sm:flex-row">
			<div className="w-full">
				<h4 className="font-semibold">Username requirements:</h4>
				<ul>
					{[0].map(i => {
						return (
							<div className="flex items-center">
								{usernameTests[i](username) ? (
									<FaTimes color="red" className="mr-1" />
								) : (
									<FaCheck color="green" className="mr-1" />
								)}
								<li className="text-sm text-gray-400">
									{usernameTestToDescription[i]}
								</li>
							</div>
						);
					})}
				</ul>
				<br />
				<h4 className="font-semibold">Other requirements:</h4>
				<ul>
					<div className="flex items-center">
						{emailTest(email) ? (
							<FaTimes color="red" className="mr-1" />
						) : (
							<FaCheck color="green" className="mr-1" />
						)}
						<li className="text-sm text-gray-400">Valid email</li>
					</div>
				</ul>
			</div>
			<div className="w-full">
				<h4 className="font-semibold">Password requirements:</h4>

				<ul>
					{[0, 1, 2, 3, 4].map(i => {
						const res = passwordTests[i](password);
						return (
							<div className="flex items-center">
								{res ? (
									<FaTimes color="red" className="mr-1" />
								) : (
									<FaCheck color="green" className="mr-1" />
								)}
								<li className="text-sm text-gray-400">
									{passwordTestToDescription[i]}
								</li>
							</div>
						);
					})}
				</ul>
			</div>
		</div>
	) : (
		<></>
	);
};

export default Requirements;
