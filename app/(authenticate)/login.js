import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("drigdark.poubelle@gmail.com");
  const [password, setPassword] = useState("password");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const router = useRouter();

  const routerHome = () => {
    router.replace("/(tabs)/home");
  }



  const handleLogin = useCallback(() => {
    try{
      const user = {
        email: email,
        password: password,
      };
      console.log("[LOGIN] User est:", user);
      axios.post("http://localhost:8002/login", user)
      .then((res) => {
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        routerHome()
        Alert.alert("Login successful");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        Alert.alert("Login failed, Please try again");
        console.log("[LOGIN] Error est:", err);
      });
    }
    catch(err){

    }
  }, [email, password]);

  useEffect(() => {
    const checkLoginStatus = async () => {
        try{
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          routerHome()
        }
      }
      catch(err){
        console.log("[LOGIN] useEffect error:", err);
      }
      };
     checkLoginStatus();
  },[])

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.titleText}>Login at your Account</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <MaterialIcons
            style={styles.inputIcon}
            name="email"
            size={24}
            color="gray"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="enter your email"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.inputIcon}
            name="lock1"
            size={24}
            color="gray"
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="enter your password"
          />
        </View>
        <View style={styles.cliclableContainer}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>Remember me</Text>
          </View>
          <Pressable>
            <Text style={styles.forgetText}>Forget Password?</Text>
          </Pressable>
        </View>
        <View style={styles.submitContainer}>
          <Pressable style={styles.submitButton} onPress={()=> handleLogin()}>
            {/* Icon de login */}
            <AntDesign name="login" size={24} color="white" />
            <Text style={styles.submitButtonText}>Login</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => router.replace("/register")}>
          <Text style={styles.redirectionText}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 5,
    marginTop: 30,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#0a66c2",
  },
  logoContainer: {
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  input: {
    color: "gray",
    width: 250,
  },
  inputIcon: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#0a66c2",
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    width: 200,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgetText: {
    color: "#0a66c2",
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  checkboxText: {
    color: "gray",
    fontSize: 15,
    fontWeight: "400",
  },
  cliclableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    width: 300,
  },
  redirectionText: {
    color: "#0a66c2",
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 18,
  },
  submitContainer:{
    alignItems: "center",
}
});
