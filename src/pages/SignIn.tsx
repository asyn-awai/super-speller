import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import TopNav from "../components/TopNav";
import Requirements from "../components/SignIn/Requirements";
import Fields from "../components/SignIn/Fields";
import db from "../firebase";
import Layout from "../components/Layout";

interface User {
    username: string;
    email: string;
    password: string;
}

interface Props {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    authUser: User | null | undefined;
}

const SignIn: React.FC<Props> = ({
    darkMode,
    setDarkMode,
    authUser,
}): JSX.Element => {
    const navigate = useNavigate();

    /**
     * true -> signing in
     * false -> signing up
     */
    const [isUser, setIsUser] = useState(false);

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
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            if (!validInput)
                throw new Error(
                    "Invalid input"
                );
            const sameEmail = await getDocs(
                query(
                    collection(
                        db,
                        "user-data"
                    ),
                    where(
                        "email",
                        "==",
                        email
                    )
                )
            );
            if (
                !isUser &&
                sameEmail.size > 0
            ) {
                throw new Error(
                    "Email already in use"
                );
            }
            if (!isUser)
                await addDoc(
                    collection(
                        db,
                        "user-data"
                    ),
                    {
                        username,
                        email,
                        password,
                    }
                );
            //set authuser in localstorage
            localStorage.setItem(
                "authUser",
                JSON.stringify({
                    username,
                    email,
                    password,
                })
            );
            navigate("/dashboard");
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        (async () => {
            if (authUser) {
                //use firebase to check if authUser username and password match
                //if they do, navigate to dashboard
                const matches = await getDocs(
                    query(
                        collection(db, "user-data"),
                        where("username", "==", authUser.username),
                        where("password", "==", authUser.password)
                    )
                );
                if (matches.size > 0) {
                    navigate("/dashboard");
                }
            } else {
                setLoadPage(true);
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
                                onSubmit={e => onFormSubmit(e)}>
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
                    {/*put spinner in the middle of the div*/}
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
        navigate("/dashboard");
    } catch (error) {
        alert(error);
    }
}
