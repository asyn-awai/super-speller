import React from "react";
import FieldInput from "./FieldInput";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
type Ref = React.RefObject<HTMLInputElement>;

interface FieldsProps {
	isUser: boolean;
	setUsername: StateSetter<string>;
	setEmail: StateSetter<string>;
	setPassword: StateSetter<string>;
	setConfirmPassword: StateSetter<string>;
	email: string;
	password: string;
	confirmPassword: string;
	usernameField: Ref;
	emailField: Ref;
	passwordField: Ref;
	confirmPasswordField: Ref;
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
	usernameField,
	emailField,
	passwordField,
	confirmPasswordField,
}): JSX.Element => {
	return isUser ? (
		<>
			<div className="flex flex-col items-center justify-center w-full">
				<FieldInput
					fieldName="email"
					setter={setEmail}
					r={emailField}
				/>
				<FieldInput
					fieldName="password"
					setter={setPassword}
					r={passwordField}
				/>
			</div>
		</>
	) : (
		<>
			<div className="flex flex-col items-center justify-center w-full">
				<FieldInput
					fieldName="username"
					setter={setUsername}
					r={usernameField}
				/>
				<FieldInput
					fieldName="email"
					setter={setEmail}
					email={email}
					r={emailField}
				/>
			</div>
			<div className="flex flex-col items-center justify-center w-full">
				<FieldInput
					fieldName="password"
					setter={setPassword}
					password={password}
					r={passwordField}
				/>
				<FieldInput
					fieldName="confirm password"
					setter={setConfirmPassword}
					r={confirmPasswordField}
				/>
			</div>
		</>
	);
};

export default Fields;
