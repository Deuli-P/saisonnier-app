import {
    StyleSheet,
    Alert,
    SafeAreaView,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable
  } from "react-native";
  import { useCallback, useEffect, useState } from "react";
  import { useRouter } from "expo-router";
  import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
  import { useAuth } from "../../context/AuthContext";
  import { jwtDecode } from "jwt-decode";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  import InputLine from "../../../components/Input/InputLine";
  
  const login = () => {

  
    const { userId, setUser, setUserId, user, setAuthType, authType } = useAuth();
  
    const [email, setEmail] = useState("Carrouf.fictif@entreprise.com");
    const [password, setPassword] = useState("password");
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const router = useRouter();
  
  // login 
    const handleLogin = useCallback(async() => {
      try{
        const user = {
          email: email,
          password: password,
          };
         await axios.post(`http://localhost:8002/login-entreprise`, user)
          .then((res) => {
            const token = res.data.token;
            AsyncStorage.setItem("authToken", token);
            AsyncStorage.setItem("authType", "entreprise");
            AsyncStorage.getItem("authType").then((res) => console.log("authType:", res));
            const decoded = jwtDecode(token);
            const loginId = decoded.userId;
            setAuthType("entreprise");
            console.log("[LOGIN] authType au login:", authType);
            setUserId(loginId);
            setEmail("");
            setPassword("");
          })
        }
        catch(err) {
          Alert.alert("Login failed, Please try again");
          console.log("[LOGIN] Error est:", err);
        }
    },[ email, password ]);
  
  
    return (
      <SafeAreaView
        style={{ flex: 1,paddingHorizontal: 15, backgroundColor: "white" }}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={
              require("../../../assets/logo.png")
            }
          />
          <View style={{ justifyContent: "flex-start",gap: 5,}}>
            <Text style={styles.titleText}>Sign in</Text>
            <View style={{flexDirection:"row", alignItems: "center"}}>
              <Text>Don't have an Entreprise account? </Text>
            <Pressable onPress={() => router.replace("/(auth)/(entreprise)/(register)")}>
              <Text style={styles.redirectionText}>
                Sign up
              </Text>
            </Pressable>
            </View>
          </View>
        </View>
  
        {/* Input Email and Password */}
        <KeyboardAvoidingView style={{
                                marginTop: 30
                              }}
        >
          <View style={styles.inputContainerGlobal}>
            {/* EMAIL */}
            <InputLine 
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              security={false}
              />
            {/* PASSWORD */}
            <InputLine 
              value={password}
              security={true}
              onChangeText={setPassword}
              placeholder="Password"
              />
          <Pressable style={{width:"100%"}}>
            <Text style={styles.forgetText}>Forget Password?</Text>
          </Pressable>
          </View>
          <View style={styles.submitContainer}>
            <Pressable style={styles.submitButton} onPress={()=> handleLogin()}>
              <Text style={styles.submitButtonText}>Login</Text>
            </Pressable>
          </View>
        <View style={{width:"100%", justifyContent:"center", marginTop:10, flexDirection:"row",gap:10, alignItems:"center"}}>
          <View style={styles.separationContent}></View>
            <Text style={{marginVertical: 10}}>Or</Text>
          <View style={styles.separationContent}></View>
          </View>
          <View style={styles.submitContainer}>
          <Pressable style={styles.submitButton} onPress={()=> handleLogin()}>
              {/* Icon de login */}
              <AntDesign name="apple1" size={24} color="white" />
              <Text style={styles.submitButtonText}>Sign in with Apple</Text>
            </Pressable>
            <Pressable style={styles.submitButton} onPress={()=> handleLogin()}>
              {/* Icon de login */}
              <AntDesign name="googleplus" size={24} color="red" />
              <Text style={styles.submitButtonText}>Sign in with Google</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
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
    titleText: {
      fontSize: 26,
      fontWeight: "bold",
      marginTop: 10,
      color: "#fca311",
    },
    logoContainer: {
      marginLeft: 25,
      marginTop: 30,
      justifyContent: "start",
    },
    logo: {
      width: 70,
      height: 70,
      resizeMode: "contain",
      borderRadius: 100,
      marginBottom: 10,
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
      backgroundColor: "#ff9d2f",
      paddingHorizontal: 5,
      paddingVertical: 12,
      borderRadius: 25,
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 300,
      gap: 15,
    },
    submitButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    forgetText: {
      color: "#ff9d2f",
      marginTop: 5,
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
      alignItems: "center",
    },
    separationContent:{
      maxWidth: 130,
      width: "40%",
      height:1,
      backgroundColor:"gray",
    }
  });
  