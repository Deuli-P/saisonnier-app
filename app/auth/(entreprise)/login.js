import {
    StyleSheet,
    Alert,
    SafeAreaView,
    View,
    Text,
    KeyboardAvoidingView,
    Pressable
  } from "react-native";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import InputLine from "../../../components/Input/InputLine";
import Header from "../components/Header/header";
import "core-js/stable/atob";
  
  const login = () => {

    const { userId, setEntreprise, setUserId, entreprise, setAuthType, authType, fetchProfileEntreprise } = useAuth();
    const [email, setEmail] = useState("carrefour.saisonnier@gmail.com");
    const [password, setPassword] = useState("password");
    const router = useRouter();
    const [isEmpty, setIsEmpty] = useState(true);

  
  // login 
    const handleLogin = useCallback(async() => {
      try{
        const user = {
          email: email,
          password: password,
          };
         await axios.post(`http://localhost:8002/entreprise/login`, user)
          .then(async(res) => {
            const token = res.data.token;
            AsyncStorage.setItem("authToken", token);
            AsyncStorage.setItem("authType", "entreprise");
            const decoded = jwtDecode(token);
            const loginId = decoded.userId;
            setAuthType("entreprise");
            console.log(`[LOGIN] LOGIN:
              Token:${token},
              LoginID:${loginId},
              AuthType ${authType}
              `);
            setUserId(loginId);
            console.log("[LOGIN] userID dans useAuth:", userId);
            fetchProfileEntreprise(userId);
            // setEmail("");
            // setPassword("");
          })
        }
        catch(err) {
          Alert.alert("Login failed, Please try again");
          console.log("[LOGIN] Error est:", err);
        }
    },[ email, password ]);
  
    useEffect(() => {
      if(email === "" || password === ""){
        setIsEmpty(true);
      }
      else{
        setIsEmpty(false);
      }
    },[email, password]);
  
  
    return (
      <SafeAreaView
      style={{ flex: 1, backgroundColor: "#242734"}}
    >
      <View style={{paddingHorizontal:15, width:"100%", position:"relative", alignItems:"center", height:"100%"}}>
        <Header/>
        {/* Input Email and Password */}
        <KeyboardAvoidingView style={{
                                marginTop: 50,
                                width:"100%",
                                backgroundColor: "#ECE1E1",
                                paddingVertical: 10,
                                borderRadius: 10,
                                shadowOffset:{
                                  width: 0,
                                  height: 2,
                                },
                                shadowOpacity: 0.7,
                                shadowRadius: 5,
                                shadowColor: "#ECE1E1",
                              }}
        >
          <View style={styles.inputContainerGlobal}>
            {/* EMAIL */}
            <InputLine 
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              security={false}
              label={"Email"}
              />
            {/* PASSWORD */}
            <InputLine 
              value={password}
              security={true}
              onChangeText={setPassword}
              placeholder="Password"
              label={"Password"}
              />
          </View>

          <View style={styles.submitContainer}>
            <View style={{ bottom: -35, position:"absolute", width:"90%"}}>
            <Pressable style={[styles.submitButton,{ backgroundColor:"#E37322", borderLeftColor:'#4C7D9F'}]} onPress={()=> handleLogin()} disabled={ isEmpty ? true : false}>
              <Text style={styles.submitButtonText}>Login</Text>
            </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
          <View style={{alignItems:"center",position:"absolute", bottom:30}}>
            <Pressable style={{width:"100%"}}>
              <Text style={styles.forgetText}>Forget Password?</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default login;
  
  const styles = StyleSheet.create({
    inputContainerGlobal: {
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingHorizontal:"8%"
    },
    input: {
      color: "gray",
      width: "80%",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderColor: "#ff9d2f",
      borderWidth: 1,
      borderRadius: 3,
    },
    submitButton: {
      paddingHorizontal: 5,
      paddingVertical: 12,
      borderRadius: 25,
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      gap: 15,
      borderLeftWidth: 3,
    },
    submitButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    forgetText: {
      color: "#ff9d2f",
      fontSize:18,
    },
    cliclableContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
      width: 300,
    },
    redirectionText: {
      color: "#ff9d2f",
      fontWeight: "bold",
      fontSize: 18,
    },
    submitContainer:{
      position:"relative",
      justifyContent:"center",
      alignItems:"center",
      position: "relative",
      height: 30,

    },
    separationContent:{
      maxWidth: 130,
      width: "40%",
      height:1,
      backgroundColor:"#ECE1E1",
    }
  });
  