import React, { useState, useEffect } from "react";
import { DictionaryAPIResponse } from "../../types";
import Layout from "../../components/Layout";

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
	const fetchWordInfo = async (
		word: string
	): Promise<DictionaryAPIResponse> => {
		try {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
			);
			const data: DictionaryAPIResponse = await res.json();
			return data;
		} catch (err) {
			console.error(err);
		}
		return { word: "error fetching" } as DictionaryAPIResponse;
	};

	return (
		<Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
			<br />
			<div className="min-h-screen">
				<div className="flex flex-col h-auto gap-5 mx-2 mb-10">
					<div className="flex items-center justify-start w-full h-36">
						<h1 className="text-2xl font-bold">Create</h1>
					</div>
					<div className="w-3/4">test</div>
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
							<AddWord />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Create;

const AddWord: React.FC = ({}): JSX.Element => {
	return (
		<div className="w-full h-20 bg-gray-50 dark:bg-gray-700 transition-colors"></div>
	);
};
