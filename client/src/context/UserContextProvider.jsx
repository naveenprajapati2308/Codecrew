import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from 'axios'
import Loader from "../components/Loader";

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(true);
    const [showToast , setShowtoast] = useState(true)

    const toggleDarkMode = () => {
        // console.log("clicked!");
        setDarkMode(!darkMode);
        // Update the data-bs-theme attribute
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'light' : 'dark');
    };

    useEffect(() => {
        // console.log(loading);
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        axios.get('/api/profile', {
            withCredentials: true
        })
            .then(({ data }) => {
                setUser(() => data)
                setLoading(() => false)
            })
            .catch(e => {
                //If there's no response, there's something wrong on making the request it self
                if (!e.response) {
                    alert(e.message)
                }
                setLoading(() => false)
            })
    }, [])


    // Received from backend '/api/login' and '/api/profile'
    const login = async (username, password) => {
        try {
            const { data } = await axios.post('/api/login', { username, password }, { withCredentials: true })
            setUser(() => data)
        } catch (error) {
            throw error
        }

    };

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/logout', { withCredentials: true })
            setUser(() => null)
        } catch (error) {
            throw error
        }
    };

    const signup = async (username, password, email) => {
        try {
            const { data } = await axios.post('/api/signup', { username, password, email }, { withCredentials: true })
            setUser(() => data)
        } catch (error) {
            throw error
        }
    }
    const updateUser = async () => {
        try {
            axios.get('/api/profile', {
                withCredentials: true
            })
                .then(({ data }) => {
                    setUser(() => data)
                    // console.log("happened");
                })
                .catch(e => {
                    //If there's no response, there's something wrong on making the request it self
                    if (!e.response) {
                        alert(e.message)
                    }
                })
        } catch (error) {
            throw error
        }
    }

    const editUser = async(data)=>{
        // console.log(data);
        try {
            //data has 'image' which is file
            // console.log(data.image);

            const payload = new FormData()
            payload.append('file' , data.image)

            const {data : response} = await axios.post('/api/user/update',payload  , 
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // console.log("This happened");
            await updateUser()
            return response
        } catch (error) {
            console.log(error);
            alert(error.message)
            throw error
        }
    }

    if (loading) {
        return <Loader />
    }
    else {
        return (
            <UserContext.Provider value={{ user, setUser, login,editUser, logout, signup, updateUser ,darkMode , toggleDarkMode , showToast , setShowtoast }}>
                {children}
            </UserContext.Provider>
        );
    }

}

export default UserContextProvider;