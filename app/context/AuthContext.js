import { useRouter, useSegments, Redirect } from "expo-router";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";



const AuthContext = createContext(
    {
        // userId
        userId: undefined,
        setUserId: () => {},
        // type user ; user ou entreprise
        authType: undefined,
        setAuthType: () => {},
        // data user
        user: undefined,
        setUser: () => {},
        // data entreprise
        entreprise: undefined,
        setEntreprise: ()=> {},
        // pour deco
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

    // userId 
    const [ userId, setUserId ] = useState(undefined);
    // type user ; user ou entreprise
    const [authType, setAuthType] = useState(undefined);
    // data user
    const [user, setUser] = useState(undefined);
    // data entreprise
    const [ entreprise , setEntreprise ] = useState(undefined);
    // pour savoir ou on est
    const rootSegment = useSegments()[0];
    // pour naviguer
    const router = useRouter();

    // Clear token, userId, user et authType
    const logout = async() => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("authType");
        setEntreprise(undefined);
        setUser(undefined);
        setUserId(undefined);
        setAuthType(undefined)
        router.push('onBoarding')
    };

    // Check si le token est present
    const checkAuthToken = async () => {
        try{
            const type = await AsyncStorage.getItem("authType");
            if (type !== null) {
                const newType = type.trim().toLowerCase();
                setAuthType(newType);
                const value = await AsyncStorage.getItem("authToken");
                const decoded = jwtDecode(value);
                const userIdDecode = decoded.userId;
                setUserId(userIdDecode);
            }
        }
        catch(err){
            logout();
        }
    }


    useEffect(()=> {
        if(!userId){
             checkAuthToken();
        }
        if(userId && authType === 'entreprise'){
                router.push("(app)/entreprise/entreprise")
            }
        if(userId && authType === "user" && !user ){
                router.push("(app)/user/profile")

            }

    },[ rootSegment,userId, authType, entreprise, user])

    const values = {
        user,
        setUser,
        userId,
        setUserId,
        entreprise,
        setEntreprise,
        logout,
        authType,
        setAuthType,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};