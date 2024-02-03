import { useRouter, useSegments, Redirect } from "expo-router";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext(
    {
        user: undefined,
        setUser: () => {},
        userId: undefined,
        setUserId: () => {},
        logout: () => {},
        authType: undefined,
        setAuthType: () => {},
        fetchProfileEntreprise: () => {},
        fetchProfileUser: () => {},
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
    const [ entreprise , setEntreprise] = useState(undefined);
    // type user ; Saisonnier ou Entreprise
    const [authType, setAuthType] = useState(undefined);
    // userId 
    const [ userId, setUserId ] = useState(undefined);
    // pour savoir ou on est
    const rootSegment = useSegments()[0];
    // pour naviguer
    const router = useRouter();

    // Clear le token, le userId et user
    const logout = async() => {
        console.log("[CONTEXT] logout");
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("authType");
        await clearAuthToken();
        setUser(null);
        setUserId(undefined);
        router.replace("onBoarding");
    };

    // clear le token
    const clearAuthToken = async() => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("authType");
    };

    // setUser
    const fetchProfileUser = useCallback(async(req)=>{
        try{
            console.log("[///////////////////");
            console.log("[CONTEXT] fetchProfile");
            await axios.get(`http://localhost:8002/user/profile/${req}`)
            .then((res) => {
                console.log("[CONTEXT] fetch profile User SUCCESS:",res.data.user);
                setUser(res.data.user);
                console.log("[///////////////////");
                router.push("/user/[user]");

            })
        }
        catch(err){
            console.log("[CONTEXT] fetchProfile ERROR",err);
        }
    },[]);

    const fetchProfileEntreprise = useCallback(async(req)=>{
        try{
            console.log("[///////////////////");
            console.log("[CONTEXT] fetchProfile");
            await axios.get(`http://localhost:8002/entreprise/profile/${req}`)
            .then((res) => {
                console.log("[CONTEXT] fetch profile Entreprise SUCCESS:",res.data.user);
                setEntreprise(res.data.user);
                console.log("[CONTEXT] Entreprise State:", entreprise);
                console.log("[///////////////////");
                router.push("/entreprise/(tabs)/[entreprise]");
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
                const type = await AsyncStorage.getItem("authType");
                setAuthType(type);
                console.log("[CONTEXT] checkToken authType:", type);
                const decoded = jwtDecode(value);
                const userId = decoded.userId;
                setUserId(userId);
                if(type === "entreprise"){
                    await fetchProfileEntreprise(userId);
                }
                if(type === "user"){
                    await fetchProfileUser(userId);
                }
            }
            else{
                setAuthType(null);
                setUserId(null);
            }
        }
        catch(err){
            console.log("[CONTEXT] error checkToken",err);
            logout();
        }
    }


    useEffect( ()=> {
        if(userId === undefined){
             checkAuthToken();
        }
        // if(userId === null && rootSegment !== "auth"){
        //     route.replace("onBoarding")
        // }
        if(userId){
            if( authType === "entreprise"){
                fetchProfileEntreprise(userId);
                if(entreprise){
                    router.push("/entreprise/(tabs)/[entreprise]")
                }
            }
            if( authType === "user"){
                fetchProfileUser(userId);
                if(user){
                   router.push("/user/[user]")
                }
            }
        }
    },[ rootSegment, userId ])

    const values = {
        user: user,
        setUser,
        userId: userId,
        setUserId,
        logout,
        authType,
        setAuthType,
        fetchProfileEntreprise,
        fetchProfileUser,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};