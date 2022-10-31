export type DictionaryAPIResponse = APIResponse[] | FailedAPIResponse;

interface APIResponse {
	word: string;
	phonetic: string;
	phonetics: Phonetic[];
	origin: string;
	meanings: Meaning[];
}

interface FailedAPIResponse {
	title: string;
	message: string;
	resolution: string;
}

interface Phonetic {
	text: string;
	audio: string;
}

interface Meaning {
	partOfSpeech: string;
	definitions: Definition[];
}

interface Definition {
	definition: string;
	example?: string;
	synonyms: string[];
	antonyms: string[];
}
