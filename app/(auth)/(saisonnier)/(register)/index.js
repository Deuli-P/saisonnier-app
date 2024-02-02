import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect} from 'react'
import {Entypo, MaterialCommunityIcons, MaterialIcons, AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import { Link, Redirect, useRouter, useNavigation } from 'expo-router';
import axios from 'axios';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';


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
    const [ address, setAddress ] = useState('Les Allues, 73550');
    const [ SIREN, setSIREN ] = useState('549204393944');
    const [ contractNumber, setContractNumber ] = useState('AR94320DDIFE30');
    const [ isAgree , setIsAgree ] = useState(false);
    const [ step, setStep ] = useState(1);
    const [ statusResp, setStatusResp ] = useState();

    const handleNextStep = () => {
        const newStep = step + 1;
        setStep(newStep);
    }

    const handlePreviousStep = () => {
        const newStep = step - 1;
        setStep(newStep);
    }

    const step1Props = {
        setEmail,
        email,
        setPassword,
        password,
        handlePreviousStep,
        handleNextStep,
        isAgree,
        setIsAgree,
    }
    
    const step2Props = {
        setFirstname,
        firstname,
        setLastname,
        lastname,
        handlePreviousStep,
        handleNextStep,
    }

    const step3Props = {
        setAddress,
        address,
        handlePreviousStep,
        handleNextStep,
    }
    const step4Props = {
        setSIREN,
        SIREN,
        setContractNumber,
        contractNumber,
        handlePreviousStep,
        handleNextStep,
    }

    const resetInput = () => {
        setEmail('');
        setPassword('');
        setFirstname('');
        setLastname('');
        setAddress('');
        setSIREN('');
        setContractNumber('');
    }

    const router = useRouter();

    if(statusResp){
        router.push({pathname:"/errorRegister",params:{status: statusResp}});
    }

    const handleRegister = async () => {
        const user ={
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            SIREN: SIREN,
            contrat: contractNumber,
            address: address,
        }
        console.log("[REGISTER] user est:", user);
        
        await axios.post('http://localhost:8002/register-saisonnier', user)
        .then((res)=>{
                console.log(res);
                console.log("Register successful, Please check your email for verification");
                resetInput();
                router.push("/confirmation");
            }
            )
            .catch(
                (err)=>{
                    console.log("[REGISTER]Error est:",err);
                    if( err.response ){
                        const newStatus = err.response.status;
                        setStatusResp(newStatus);
                    }
            }
        )
    };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white", paddingHorizontal: 15}}>
        <View style={styles.logoContainer}>
            <Image
            style={styles.logo}
            source={
                require("../../../../assets/logo.png")
            }
            />
          <Text style={styles.titleText}>Sign up on Saisonnier account</Text>
          <View style={{flexDirection:"row", alignItems: "center"}}>
            <Text>or </Text>
          <Pressable onPress={() => router.replace("/(auth)/saisonnier/login")}>
            <Text style={styles.redirectionText}>
              Sign in
            </Text>
          </Pressable>
          </View>
        </View>
        <View>
            {step === 1 && <Step1 data={step1Props}/>}
            {step === 2 && <Step2 data={step2Props}/>}
            {step === 3 && <Step3 data={step3Props}/>}
            {step === 4 && <Step4 data={step4Props}/>}
        </View>
        {
            step === 4 ?
            <View style={styles.submitContainer}>

            <Pressable style={styles.submitButton} onPress={handleRegister}> 
                <Foundation name="clipboard-notes" size={24} color="white" />
                <Text style={styles.submitButtonText}>Register</Text>
            </Pressable>
        </View>
        : null }

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
        fontSize: 22,
        fontWeight: "bold",
        color: "#ff9d2f"
    },
    logoContainer:{
        marginTop: 30,
        marginLeft: 25,
        marginBottom: 20,
    },
    logo: {
        width: 160,
        height: 160,
        resizeMode: "contain",
        borderRadius: 100,
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
        fontWeight: "bold",
        fontSize: 16,
    },
    submitContainer:{
        alignItems: "center",
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: "contain",
        borderRadius: 100,
        marginBottom: 10,
      },
})