import { createContext, useEffect, useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserContext = createContext({
        userId: "",
        user: {},
});

export const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState();
    const [user, setUser] = useState();

    // recup du token , l'id et des données users

    const fetchToken = async ()=> {
        try{
            await AsyncStorage.getItem("authToken").then((value)=>{
                const userId = jwtDecode(value).userId;
                setUserId(userId);
            })
        }
        catch(err){
            console.log("[CONTEXT] Pas de Token present:", err);
        }
    }

    const fetchUserProfile = async () => {
        try{
            const response = await axios.get(`http://localhost:8002/profile/${userId}`);
            const userData = response.data.user;
            setUser(userData);
        }
        catch(err){
            console.log("[CONTEXT] pas de donnée User:", err);
        }
    }

    useEffect(() => {
        fetchToken();
        fetchUserProfile();
    },[])

    const values = {
        userId,
        user,
        setUser,
        setUserId,
    }

    return(
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    
    )
}

const useUser=()=> {
    const context = useContext(UserContext);
    return context;
}

export default useUser;