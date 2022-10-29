import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import Layout from "../../components/Layout";
import { FaPlus, FaShare, FaEdit, FaEllipsisH, FaTrash } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import Modal from "../../components/Modal";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import {
	getDocs,
	where,
	query,
	collection,
	deleteDoc,
	doc,
} from "firebase/firestore";

interface ListDataItem {
	authorUsername: string;
	listId: string;
	listContent: {
		definition: string;
		word: string;
	}[];
	listTitle: string;
	listDescription: string;
}

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lists: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	const navigate = useNavigate();
	const [userListData, setUserListData] = useState<ListDataItem[]>([]);
	useEffect(() => {
		(async () => {
			const authUser = JSON.parse(
				localStorage.getItem("authUser") ?? "{}"
			);
			if (!authUser.password || !authUser.email || !authUser.username)
				navigate("/signin");
			console.log(authUser.username);
			const querySnapshot = await getDocs(
				query(
					collection(db, "lists"),
					where("authorUsername", "==", authUser.username)
				)
			);
			setUserListData(
				querySnapshot.docs.map(doc => doc.data()) as ListDataItem[]
			);
		})();
	}, []);
	return (
		<>
			<Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
				{/* <Modal open={true} onClose={() => {}} center /> */}
				<br />
				<div className="min-h-screen">
					<div className="flex flex-col h-auto gap-5 mx-2 mb-10">
						<div className="flex items-center justify-start w-full h-36">
							<h1 className="text-2xl font-bold">Your Lists</h1>
						</div>
						<div>
							<div
								className="w-36 h-10 btn"
								onClick={() => navigate("/lists/create")}
							>
								<p className="font-bold text-xl mr-3 text-white">
									New List
								</p>
								<span>
									<FaPlus size={20} color="fff" />
								</span>
							</div>
						</div>
						<div className="flex flex-wrap items-center justify-evenly sm:basis-1/2">
							{userListData.map(
								(
									{
										listId,
										listTitle,
										authorUsername,
										listDescription,
									},
									i
								) => (
									<ListCard
										listId={listId}
										userListData={userListData}
										setUserListData={setUserListData}
										title={listTitle}
										author={authorUsername}
										description={listDescription}
										darkMode={darkMode}
										key={i}
									/>
								)
							)}
						</div>
					</div>
					<div className="flex flex-col h-auto gap-5 mx-2 mb-10">
						<div className="flex items-center justify-start w-full h-36">
							<h1 className="text-2xl font-bold">Saved Lists</h1>
						</div>
						<div className="flex flex-wrap items-center justify-evenly sm:flex-row md:basis-2">
							{[0, 1, 2, 3, 4].map(() => (
								<ListCard
									darkMode={darkMode}
									setUserListData={setUserListData}
								/>
							))}
						</div>
					</div>
				</div>
				<br />
			</Layout>
		</>
	);
};

export default Lists;

interface LCProps {
	listId?: string;
	userListData?: ListDataItem[];
	setUserListData: React.Dispatch<React.SetStateAction<ListDataItem[]>>;
	title?: string;
	author?: string;
	description?: string;
	darkMode: boolean;
}

const ListCard: React.FC<LCProps> = ({
	listId = "123",
	userListData = [],
	setUserListData,
	title = "Title",
	author = "Author",
	description = "Description",
	darkMode,
}): JSX.Element => {
	const [modalProps, setModalProps] = useState<React.ReactNode | null>(null);
	return (
		<div className="flex flex-col w-full max-w-xs p-4 m-5 bg-white rounded-lg shadow-md max-h-96 dark:bg-gray-800 gap-y-2">
			<title className="text-2xl font-bold dark:text-white line-clamp-1 d">
				{title}
			</title>
			<small className="font-semibold">{author}</small>
			<p className="mb-2 text-sm line-clamp-4 text-gray-400">
				{description}
			</p>
			<Options
				editable
				shareable
				deletable
				listInfo
				darkMode={darkMode}
				listId={listId}
				userListData={userListData}
				setUserListData={setUserListData}
			/>
		</div>
	);
};

interface OptionsProps {
	listId: string;
	userListData: ListDataItem[];
	setUserListData: React.Dispatch<React.SetStateAction<ListDataItem[]>>;
	editable: boolean;
	shareable: boolean;
	deletable: boolean;
	listInfo: boolean;
	darkMode: boolean;
}

const Options: React.FC<OptionsProps> = ({
	listId,
	userListData,
	setUserListData,
	editable,
	shareable,
	deletable,
	listInfo,
	darkMode,
}): JSX.Element => {
	const navigate = useNavigate();
	const OptionButton: React.FC<{
		icon: JSX.Element;
		title: string;
		onClick?: () => void;
	}> = ({ icon, title, onClick }): JSX.Element => {
		return (
			<button
				title={title}
				className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700"
				onClick={onClick}
			>
				{icon}
			</button>
		);
	};
	const deleteList = async () => {
		const listToDelete = await getDocs(
			query(collection(db, "lists"), where("listId", "==", listId))
		);
		await deleteDoc(doc(db, "lists", listToDelete.docs[0].id));
		setUserListData(userListData.filter(list => list.listId !== listId));
	};
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const root = document.getElementById("root");
		if (open) {
			disableBodyScroll(root);
		} else {
			enableBodyScroll(root);
			setContent(<></>);
		}
	}, [open]);
	const [content, setContent] = useState<React.ReactNode>(<></>);
	const [title, setTitle] = useState<string>("");
	return (
		<>
			<Modal
				open={open}
				setOpen={setOpen}
				darkMode={darkMode}
				dimensions={{ width: "30%" }}
				title={title}
			>
				{content}
			</Modal>
			<div className="flex justify-between">
				<div className="flex gap-3">
					{editable && (
						<OptionButton
							icon={<FaEdit color={"white"} />}
							title="edit"
							onClick={() => {
								navigate(`/lists/create/${listId}`);
							}}
						/>
					)}
					{shareable && (
						<OptionButton
							icon={<FaShare color={"white"} />}
							title="share"
							onClick={() => {
								setTitle("Share");
								setContent(
									<div className="flex flex-col items-center justify-between md:max-w-sm md:h-64 lg:max-w-lg lg:h-96 aspect-square">
										<h2 className="text-2xl">Share</h2>
										<div className="flex items-center justify-center h-64 w-64 bg-gray-300">
											qr code
										</div>
										<br />
										<p>link</p>
									</div>
								);
								setOpen(true);
							}}
						/>
					)}
					{listInfo && (
						<OptionButton
							icon={<FaEllipsisH color={"white"} />}
							title="more info"
							onClick={() => setOpen(true)}
						/>
					)}
					{deletable && (
						<OptionButton
							icon={<FaTrash color={"white"} />}
							title="delete list"
							onClick={() => {
								setTitle("Delete");
								setContent(
									<div className="flex flex-col items-center justify-center w-full p-3 mb-5 gap-5">
										<p className="text-center text-xl text-white font-semibold">
											Are you sure you want to delete this
											list?
										</p>
										<div className="w-full flex justify-evenly">
											<div
												className="btn p-3"
												role="button"
												onClick={() => setOpen(false)}
											>
												<p className="btn-text">
													Cancel
												</p>
											</div>
											<div
												className="btn p-3"
												role="button"
												onClick={() => {
													deleteList();
													setOpen(false);
												}}
											>
												<p className="btn-text">
													Confirm
												</p>
											</div>
										</div>
									</div>
								);
								setOpen(true);
							}}
						/>
					)}
				</div>
				<OptionButton icon={<MdQuiz color={"white"} />} title="quiz" />
			</div>
		</>
	);
};
