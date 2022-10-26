import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import db from "../../firebase";
import Layout from "../../components/Layout";
import { FaPlus, FaShare, FaEdit, FaEllipsisH } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import Modal from "../../components/Modal";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lists: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	const navigate = useNavigate();
	const [modalProps, setModalProps] = useState<React.ReactNode | null>(null);
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
								className="w-36 h-10 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer"
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
							<ListCard setModalProps={setModalProps} />
							<ListCard setModalProps={setModalProps} />
							<ListCard setModalProps={setModalProps} />
							<ListCard setModalProps={setModalProps} />
						</div>
					</div>
					<div className="flex flex-col h-auto gap-5 mx-2 mb-10">
						<div className="flex items-center justify-start w-full h-36">
							<h1 className="text-2xl font-bold">Saved Lists</h1>
						</div>
						<div className="flex flex-wrap items-center justify-evenly sm:flex-row md:basis-2">
							<ListCard setModalProps={setModalProps} />
							<ListCard setModalProps={setModalProps} />
							<ListCard setModalProps={setModalProps} />
							<ListCard setModalProps={setModalProps} />
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
	setModalProps: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const ListCard: React.FC<LCProps> = ({ setModalProps }): JSX.Element => {
	return (
		<div className="flex flex-col w-full max-w-xs p-4 m-5 bg-white rounded-lg shadow-md h-96 dark:bg-gray-800 gap-y-2">
			<title className="text-xl font-bold dark:text-white line-clamp-1 d">
				Title
			</title>
			<small>Author</small>
			<img
				src="https://via.placeholder.com/150"
				className="h-[40%] object-cover"
			/>
			<p className="mb-2 text-sm line-clamp-4">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
				quod praesentium rerum consequatur ab a at sapiente temporibus
				id, ut sunt debitis nobis soluta iste delectus incidunt. Minus,
				repellat facilis!
			</p>
			<Options editable shareable moreInfo />
		</div>
	);
};

interface OptionsProps {
	editable: boolean;
	shareable: boolean;
	moreInfo: boolean;
}

const Options: React.FC<OptionsProps> = ({
	editable,
	shareable,
	moreInfo,
}): JSX.Element => {
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
	return (
		<>
			<Modal open={open} setOpen={setOpen} setContent={setContent}>
				{content}
			</Modal>
			<div className="flex justify-between">
				<div className="flex gap-3">
					{editable && (
						<OptionButton
							icon={<FaEdit color={"white"} />}
							title="edit"
							onClick={() => setOpen(true)}
						/>
					)}
					{shareable && (
						<OptionButton
							icon={<FaShare color={"white"} />}
							title="share"
							onClick={() => {
								setOpen(true);
								setContent(
									<div className="flex flex-col items-center justify-between  md:max-w-sm md:h-64 lg:max-w-lg lg:h-96 aspect-square">
										<h2 className="text-2xl">Share</h2>
										<div className="flex items-center justify-center h-64 w-64 bg-gray-300">
											qr code
										</div>
										<br />
										<p>link</p>
									</div>
								);
							}}
						/>
					)}
					{moreInfo && (
						<OptionButton
							icon={<FaEllipsisH color={"white"} />}
							title="more info"
							onClick={() => setOpen(true)}
						/>
					)}
				</div>
				<OptionButton icon={<MdQuiz color={"white"} />} title="quiz" />
			</div>
		</>
	);
};
