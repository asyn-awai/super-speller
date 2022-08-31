import React from "react";
import { HiAtSymbol } from "react-icons/hi";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";

interface Props {
	fieldName: "username" | "email" | "password" | "confirm password";
	setter: React.Dispatch<React.SetStateAction<string>>;
	// username?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

const FieldInput: React.FC<Props> = ({
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

export default FieldInput;
