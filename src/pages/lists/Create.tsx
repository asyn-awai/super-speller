import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { DictionaryAPIResponse } from "../../types";
import Layout from "../../components/Layout";
import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import Modal from "../../components/Modal";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";

interface Word {
	word: string;
	definition: string;
}

interface WordInfo {
	definition: string;
	partOfSpeech: string;
	example: string | null;
} // for addword section

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	const [wordsList, setWordsList] = useState<Word[]>([]);
    const [options, setOptions] = useState<{
        hideWordInfo: boolean;
    }>({
        hideWordInfo: false
    });
    const [listTitle, setListTitle] = useState("");
    const [listDescription, setListDescription] = useState("");
	return (
		<Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
			{/* <br /> */}
			<div className="min-h-screen">
				<div className="flex flex-col h-auto gap-5 mx-2">
					<div className="flex items-center justify-start w-full h-36">
						<h1 className="text-2xl font-bold">Create</h1>
					</div>
					<div className="flex justify-center">
						<div className="w-3/4">
							<label
								htmlFor="options"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Options
							</label>
							<ul
								id="options"
								className="items-center w-auto text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							>
								{["Hide word info"].map(title => (
									<Checkbox title={title} key={nanoid()} />
								))}
							</ul>
						</div>
					</div>
					<div className="flex flex-col gap-5 items-center justify-center">
						<div className="flex gap-5 w-3/4">
							<div className="w-1/2">
								<label
									htmlFor="title"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Title
								</label>
								<input
									id="title"
									className="input-form-create"
									placeholder="Title"
								/>
							</div>
							<div className="w-1/2">
								<label
									htmlFor="description"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Description
								</label>
								<input
									id="description"
									className="input-form-create"
									placeholder="Description"
								/>
							</div>
						</div>
						<div className="w-3/4">
                            {wordsList.map(({ word, definition }) => {
                                return <WordCard word={word} definition={definition} setWordsList={setWordsList} key={nanoid()} />
                            })}
							<AddWordCard darkMode={darkMode} setWordsList={setWordsList} />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Create;

const Checkbox: React.FC<{ title: string }> = ({ title }) => {
	return (
		<li className="w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
			<div className="flex items-center pl-3 mr-2">
				<input
					id={`${title}-checkbox`}
					type="checkbox"
					value=""
					className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
				/>
				<label
					htmlFor={`${title}-checkbox`}
					className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300 select-none"
				>
					{title}
				</label>
			</div>
		</li>
	);
};

const WordCard: React.FC<{
    word: string,
    definition: string,
    setWordsList: React.Dispatch<React.SetStateAction<Word[]>>;
    hideDef?: boolean
}> = ({ word, definition, setWordsList, hideDef = false }) => {
	return (
		<div className="p-4 my-8 border border-gray-200 rounded-lg sm:p-6 lg:p-8 dark:border-gray-700 bg-white dark:bg-gray-700">
			<div className="flex space-x-5">
				<div className="flex items-center justify-center w-2/5 line-clamp-1">
					<h3 className="font-bold text-xl">{word}</h3>
				</div>
				{!hideDef && (
					<div className="w-3/5 h-auto break-words line-clamp-3">
                        {definition}
					</div>
				)}
				<div 
                    className="flex justify-end w-1/12 cursor-pointer"
					onClick={() => {
                        setWordsList(prev => prev.filter(x => x.word !== word))
                    }}
                >
                    <FaTimes size={25} color={"#3b82f6"} />
				</div>
			</div>
		</div>
	);
};

const AddWordCard: React.FC<{
	darkMode: boolean;
    setWordsList: React.Dispatch<React.SetStateAction<Word[]>>;
}> = ({ darkMode, setWordsList }): JSX.Element => {
	const [modalShow, setModalShow] = useState<boolean>(false);
	const [wordQueryInfo, setWordQueryInfo] = useState<WordInfo[]>([]);
	const [wordInput, setWordInput] = useState<string>("");
	const [defInput, setDefInput] = useState<string>("");
    const wordInputRef = useRef<HTMLInputElement>(null);
	const defInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const root = document.getElementById("root");
		if (modalShow) {
			disableBodyScroll(root);
		} else {
			enableBodyScroll(root);
		}
	}, [modalShow]);

	const fetchWordInfo = async (word: string) => {
		try {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
			);
			const data: DictionaryAPIResponse = await res.json();
			return data;
		} catch (err) {
			console.error(err);
		}
		return { title: "An Error Occured" } as DictionaryAPIResponse;
	};

	const handleGetDef = async () => {
		if (defInputRef.current === null) {
			alert("error");
			return;
		}
		const wordQuery = wordInput.trim();
		const data = await fetchWordInfo(wordQuery);
		if (!Array.isArray(data)) {
			alert(data.title);
			return;
		}
		const resInfo = [];
		for (const meaning of data[0].meanings) {
			const partOfSpeech = meaning.partOfSpeech;
			for (const { definition, example = null } of meaning.definitions) {
				resInfo.push({ definition, example, partOfSpeech });
			}
		}
		if (resInfo.length > 1) {
			setWordQueryInfo(resInfo);
			setModalShow(true);
		}
	};

    const handleAddWord = () => {
        if (wordInput.length === 0) return;
        setWordsList(prev => [...prev, { word: wordInput.toLowerCase(), definition: defInput }])
        setWordQueryInfo([]);
        if (wordInputRef.current != null)
            wordInputRef.current.value = "";
        if (defInputRef.current != null)
            defInputRef.current.value = "";
        setWordInput("");
        setDefInput("");
    }
    
	return (
		<>
			<Modal
				open={modalShow}
				setOpen={setModalShow}
				darkMode={darkMode}
				title="Select a definition"
			>
				<div className="w-auto max-h-96 overflow-y-scroll p-3">
					{wordQueryInfo.map(info => (
						<DefinitionCard
							{...info}
							key={nanoid()}
							inputRef={defInputRef}
							setModalShow={setModalShow}
                            setDefInput={setDefInput}
						/>
					))}
				</div>
			</Modal>
			<div className="p-4 my-8 border border-gray-200 rounded-lg sm:p-6 lg:p-8 dark:border-gray-700 bg-white dark:bg-gray-700">
				<div className="flex flex-col sm:flex-row gap-5">
					<div className="w-full">
						<label
							htmlFor="word-input"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Word
						</label>
						<div className="flex">
							<input
								id="word-input"
                                ref={wordInputRef}
								className="input-form-create dark:placeholder-gray-500 dark:bg-gray-800 w-full rounded-r-none"
								onChange={e => setWordInput(e.target.value)}
								placeholder="Word"
							/>
							<div
								role="button"
								className={`text-sm h-10 w-56 rounded-lg transition-colors flex items-center justify-center rounded-l-none select-none
                                            ${wordInput.length === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
								onClick={() => { if (wordInput.length !== 0) handleGetDef() }}
							>
								<span className="mr-2">
									<FaSearch size={15} color="white" />
								</span>
								<p className="md:block hidden text-white font-semibold">
									Dictionary
								</p>
							</div>
						</div>
					</div>
					<div className="w-full">
						<label
							htmlFor="def-input"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Definition
						</label>
						<input
							id="def-input"
							ref={defInputRef}
							onChange={e => setDefInput(e.target.value)}
							className="input-form-create dark:placeholder-gray-500 dark:bg-gray-800"
							placeholder="Use the dictionary lookup button or use your own"
						/>
						<div className="flex justify-end mt-5">
							<div
								role="button"
								className={`text-sm h-10 w-28 rounded-lg transition-colors flex items-center justify-center border border-opacity-0
                                            ${wordInput.length === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                                onClick={handleAddWord}
							>
								<span className="mr-2">
									<FaPlus size={15} color="white" />
								</span>
								<p className="text-white font-semibold">
									Add Word
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const DefinitionCard: React.FC<{
	definition: string;
	example: string | null;
	partOfSpeech: string;
	inputRef: React.RefObject<HTMLInputElement>;
	setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
	setDefInput: React.Dispatch<React.SetStateAction<string>>;
}> = ({
	definition,
	example,
	partOfSpeech,
	inputRef,
	setModalShow,
    setDefInput
}): JSX.Element => {
	const partOfSpeechAbv = {
		noun: "n.",
		verb: "v.",
		adjective: "adj.",
		adverb: "adv.",
		preposition: "prep.",
		conjunction: "conj.",
		interjection: "interj.",
		pronoun: "pron.",
		determiner: "det.",
		exclamation: "excl.",
	} as { [key: string]: string };
	const setText = () => {
		if (inputRef.current === null) return;
		inputRef.current.value = definition;
        setDefInput(definition);
		setModalShow(false);
	};
	return (
		<div
			onClick={setText}
			className="p-2 min-h-14 flex items-center gap-5 dark:bg-gray-700 rounded-lg mb-2 cursor-pointer dark:border-none border"
		>
			<h2 className="d w-8">
				{partOfSpeechAbv[partOfSpeech] ?? partOfSpeech}
			</h2>
			<div>
				<p className="font-semibold d">{definition}</p>
				{example && <p className="text-gray-400">{example}</p>}
			</div>
		</div>
	);
};
