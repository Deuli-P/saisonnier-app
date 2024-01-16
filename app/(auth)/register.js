import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState} from 'react'
import {Entypo, MaterialCommunityIcons, MaterialIcons, AntDesign, Foundation } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

// Mettre un slider pour plusieurs etape de register
// Mettre un bouton pour passer a l'etape suivante
    // Premiere page: email , password, username,
    // Deuxieme page: firstname, lastname, age, adresse, numero de telephone
    // Troisieme page: employeur, numero de contrat(required)
    // Quatrieme page: image de profil, description

const register = () => {

    const [ email, setEmail ] = useState('drigdark.poubelle@gmail.com');
    const [ password, setPassword ] = useState('password');
    const [ firstname, setFirstname ] = useState('Test');
    const [ lastname, setLastname ] = useState('Tester');
    const [ image, setImage ] = useState('https://www.shutterstock.com/image-vector/design-galery-image-thumbnail-symbol-260nw-2161187139.jpg');
    const router = useRouter();

    const handleRegister = async () => {
        const user ={
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            userImage: image,
        }
        console.log("[REGISTER] user est:", user);
        
        await axios.post('http://localhost:8002/register', user)
        .then((res)=>{
                console.log(res);
                Alert.alert("Register successful, Please check your email for verification");
                setEmail('');
                setPassword('');
                setFirstname('');
                setLastname('');
                setImage('');
            }
        )
        .catch(
            (err)=>{
                Alert.alert("Register failed, Please try again"),
                console.log("[REGISTER]Error est:",err);
            }
        )
    };

  return (
    <SafeAreaView style={{flex:1, alignItems: "center", backgroundColor:"white"}}>
        <View style={styles.logoContainer}>
            <Image 
                style={styles.logo}
                source={{
                    uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png"
                }}
            />
        </View>
        <View style={{alignItems: "center"}}>
            <Text style={styles.titleText}>Join us</Text>
        </View>
        <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons style={styles.inputIcon} name="rename-box" size={24} color="gray" />
                <TextInput 
                    style={styles.input}
                    value={firstname}
                    onChangeText={(text)=>setFirstname(text)}
                    placeholder='enter your firstname'/>
            </View>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons style={styles.inputIcon} name="rename-box" size={24} color="gray" />
                <TextInput 
                    style={styles.input}
                    value={lastname}
                    onChangeText={(text)=>setLastname(text)}
                    placeholder='enter your lastname'/>
            </View>
            <View style={styles.inputContainer}>
                <MaterialIcons style={styles.inputIcon} name="email" size={24} color="gray" />
                <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                    placeholder='enter your email'/>
            </View>
            <View style={styles.inputContainer}>
                <AntDesign style={styles.inputIcon} name="lock1" size={24} color="gray" />
                <TextInput 
                    style={styles.input}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text)=>setPassword(text)}
                    placeholder='enter your password'/>
            </View>
            <View style={styles.inputContainer}>
                <Entypo style={styles.inputIcon} name="image" size={24} color="gray" />
                <TextInput 
                    style={styles.input}
                    value={image}
                    onChangeText={(text)=>setImage(text)}
                    placeholder='enter image url'/>
            </View>
            <View style={styles.submitContainer}>

                <Pressable style={styles.submitButton} onPress={handleRegister}> 
                    <Foundation name="clipboard-notes" size={24} color="white" />
                    <Text style={styles.submitButtonText}>Register</Text>
                </Pressable>
            </View>
            <Pressable 
                onPress={()=> router.replace("/login")}
            >
            <Text style={styles.redirectionText}>
                Already have an account? Sign in
            </Text>
            </Pressable>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({
    inputContainer:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        gap:5,
        marginTop: 20,
    },
    titleText:{
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 12,
        color: "#ff9d2f"
    },
    logoContainer:{
        marginTop: 30,
    },
    logo:{
        width: 150,
        height: 100,
        resizeMode: "contain"
    },
    input:{
        color:"gray",
        width: 250,
    },
    inputIcon:{
        marginLeft: 10,
    },
    submitButton:{
        backgroundColor: "#ff9d2f",
        width: 200,
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
    },
    submitButtonText:{
        color: "white",
        fontWeight: "bold",
    },
    redirectionText:{
        color: "#ff9d2f",
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 18,
    },
    submitContainer:{
        alignItems: "center",
    }
})