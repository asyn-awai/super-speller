import React from 'react'
import Layout from '../components/Layout'

interface IItem {
    word: string;
    score: number;
}

interface Props {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Mastery: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
    return (
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
            <div className="min-h-screen">
                <div className="flex flex-col h-auto gap-5 mx-2 mb-10">
                    <div className="flex items-center justify-start w-full h-36">
                        <h1 className="text-2xl font-bold">Mastery</h1>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex flex-col w-3/4">
                            <MasteryHeader />
                            <br />
                            <MasteryItems items={[
                                { word: 'A', score: 0.5 },
                                { word: 'B', score: 1 },
                                { word: 'C', score: 0.5 },
                            ]} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Mastery;

const MasteryHeader: React.FC = (): JSX.Element => {
    return (
        <div className="px-14 h-16 flex items-center rounded transition-colors dark:bg-gray-700 bg-gray-100">
            <div className="flex justify-center w-[50%]">
                <strong className="text-lg">Word</strong>
            </div>
            <div className="flex justify-center w-[50%]">
                <strong className="text-lg">Score</strong>
            </div>
        </div>
    );
};

const MasteryItems: React.FC<{
    items: IItem[];
}> = ({ items }): JSX.Element => {
    const Item: React.FC<{ item: IItem }> = ({ item }) => {
        return (
            <div className="px-14 h-16 flex items-center rounded transition-colors dark:bg-gray-700 bg-gray-100 mb-2">
                <div className="flex justify-center w-[50%]">
                    <strong className="text-lg">{item.word}</strong>
                </div>
                <div className="flex justify-center w-[50%]">
                    <strong className="text-lg">{item.score}</strong>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full">
            {items.map(item => (
                <Item item={item} />
            ))}
        </div>
    );
};