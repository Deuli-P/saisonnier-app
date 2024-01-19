import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext(
    {
        user: null,
        setUser: () => {},
        userId: null,
        setUserId: () => {},
        logout: () => {},
    }
);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
    };

export const AuthProvider = ({ children }) => {

    // data user
    const [user, setUser] = useState(undefined);
    // userId 
    const [ userId, setUserId ] = useState(undefined);
    // pour savoir ou on est
    const rootSegment = useSegments()[0];
    // pour naviguer
    const route = useRouter();

    // Clear le token, le userId et user
    const logout = async() => {
        console.log("[CONTEXT] logout");
        await AsyncStorage.removeItem("authToken");
        await clearAuthToken();
        setUser(null);
        setUserId(undefined);
        route.replace("(auth)/login");
    };

    // clear le token
    const clearAuthToken = async() => {
        await AsyncStorage.removeItem("authToken");
    };

    // setUser
    const fetchProfile = useCallback(async(req)=>{
        try{
            console.log("[///////////////////");
            console.log("[CONTEXT] fetchProfile");
            await axios.get(`http://localhost:8002/profile/${req}`)
            .then((res) => {
                console.log("[CONTEXT] fetch profile SUCCESS:",res.data.user);
                setUser(res.data.user);
                console.log("[///////////////////");
            })
        }
        catch(err){
            console.log("[CONTEXT] fetchProfile ERROR",err);
        }
    },[]);

    // Check si le token est present
    const checkAuthToken = async () => {
        try{
            const value = await AsyncStorage.getItem("authToken");
            if (value !== null) {
                const decoded = jwtDecode(value);
                const userId = decoded.userId;
                setUserId(userId);
                await fetchProfile(userId);
                route.replace("(app)/(tabs)/home");
            }
            else{
                setUserId(null);
            }
        }
        catch(err){
            console.log("[CONTEXT] error checkToken",err);
        }
    }


    useEffect(()=> {
        if(userId === undefined){
            checkAuthToken();
        };
        if(userId === null && rootSegment !== "(auth)"){
            route.replace("(auth)/login")
        }
        else if(userId !== null && rootSegment === "(auth)"){
            fetchProfile(userId);
            route.replace("(app)/(tabs)")
        }
    },[ rootSegment, userId ])

    const values = {
        user: user,
        setUser,
        userId: userId,
        setUserId,
        logout,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};