import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import { getDocs, where, query, collection } from "firebase/firestore";
import db from '../firebase'

interface Profile {
    username: string;
    
}

interface Props {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<Props> = ({ darkMode, setDarkMode }): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState<Profile>();
    useEffect(() => {
        const path = location.pathname.split('/');
        const authUser = JSON.parse(localStorage.getItem('authUser') ?? "{}");
        if (!authUser.password || !authUser.email || !authUser.username)
				navigate("/signin");
        const username = path.length === 1 ? authUser.username : path.pop();
        (async () => {
           const profileQuery = (
				await getDocs(
					query(
						collection(db, "user-data"),
						where("username", "==", username),
					)
				)
			).map(doc => doc.data())
            setProfile()
        })()
    }, [])
    return (
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} sideNav>
            <div className='min-h-screen'>
                test
            </div>
        </Layout>    
    )
}

export default Profile;