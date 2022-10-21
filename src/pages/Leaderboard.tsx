import React from 'react'
import Layout from '../components/Layout'
import { FaTrophy } from 'react-icons/fa'

interface Props {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IItem {
    rank: number;
    username: string;
    score: number;
}

const Leaderboard: React.FC<Props> = ({
    darkMode,
    setDarkMode
}): JSX.Element => {
    return (
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
			<div className="min-h-screen">
                <div className="flex flex-col h-auto gap-5 mx-2 mb-10">
					<div className="flex items-center justify-start w-full h-36">
						<h1 className="text-2xl font-bold">Leaderboard</h1>
					</div>
                    <div className='w-full flex justify-center'>
                        <div className='flex flex-col w-3/4'>
                            <LeaderboardHeader darkMode={darkMode} setDarkMode={setDarkMode} />
                            <br />
                            <LeaderboardItems 
                                darkMode={darkMode} 
                                setDarkMode={setDarkMode}
                                items={[
                                    {
                                        rank: 1,
                                        username: 'Alex',
                                        score: 100
                                    },
                                    {
                                        rank: 2,
                                        username: 'John',
                                        score: 50
                                    
                                    },
                                    {
                                        rank: 3,
                                        username: 'Paul',
                                        score: 50
                                    }
                                ]}
                            />
                        </div>
                    </div>
				</div>
            </div>
        </Layout>
    )
}

export default Leaderboard;

const LeaderboardHeader: React.FC = (): JSX.Element => {
    return (
        <div className="px-14 h-16 flex items-center rounded transition-colors dark:bg-gray-700 bg-gray-100">
            <div className='flex w-[25%]'>
                <strong className='text-lg'>Rank</strong>
            </div>
            <div className='flex justify-center w-[50%]'>
                <strong className='text-lg'>Username</strong>
            </div>
            <div className='flex justify-end w-[25%]'>
                <strong className='text-lg'>Score</strong>
            </div>
        </div>
    )
}

const LeaderboardItems: React.FC<{
    items: IItem[];
}> = ({ items }): JSX.Element => {
    const Item: React.FC<{item: IItem[]}> = ({item}) => {
        return (
            <div className="px-14 h-16 flex items-center dark:bg-gray-700 bg-gray-100 rounded transition-colors mb-2">
                <div className='flex w-[25%]'>
                    <FaTrophy size={10} />
                    <span className='text-lg font-bold'>{item.rank}</span>
                </div>
                <div className='flex justify-center w-[50%]'>
                    <strong className='text-lg'>{item.username}</strong>
                </div>
                <div className='flex justify-end w-[25%]'>
                    <strong className='text-lg'>{item.score}</strong>
                </div>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col w-full">
            {items.map(i => <Item item={i} />)}
        </div>
    )
    
}