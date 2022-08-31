import FieldInput from "./FieldInput";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

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
	return isUser ? (
		<>
			<div className="flex flex-col items-center justify-center w-full">
				<FieldInput fieldName="email" setter={setEmail} />
				<FieldInput fieldName="password" setter={setPassword} />
			</div>
		</>
	) : (
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

export default Fields;
