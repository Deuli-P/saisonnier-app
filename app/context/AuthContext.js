import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
    };

export const AuthProvider = ({ children }) => {

    // data user
    const [user, setUser] = useState();
    // userId 
    const [ userId, setUserId ] = useState(undefined);
    // pour savoir ou on est
    const rootSegment = useSegments()[0];
    // pour naviguer
    const route = useRouter();

    // Clear le token, le userId et user
    const logout = async() => {
        await AsyncStorage.removeItem("authToken");
        clearAuthToken();
        setUser(null);
        setUserId("");
    };

    // Check si le token est present
    const checkAuthToken = async () => {
        try{
            const value = await AsyncStorage.getItem("authToken");
            if (value !== null) {
                const decoded = jwtDecode(value);
                const userId = decoded.userId;
                setUserId(userId);
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
            route.replace("(app)/(tabs)/home")
        }
    },[ rootSegment, userId])

    const values = {
        user: user,
        setUser,
        userId: userId,
        setUserId,
        logout
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};