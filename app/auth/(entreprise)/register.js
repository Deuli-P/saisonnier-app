import { ScrollView, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect} from 'react'
import {  Link, useRouter} from 'expo-router';
import InputLine from '../../../components/Input/InputLine';
import Animated, {FadeInRight} from 'react-native-reanimated';
import Header from "../components/Header/header";
import axios from 'axios';



// Mettre un slider pour plusieurs etape de register
// Mettre un bouton pour passer a l'etape suivante
    // Premiere page: email , accepter condition, password.
    // Deuxieme page: nom entreprise, nom propietaire.
    // Troisieme page: adresse.
    // Quatrieme page: SIREN,

const register = () => {


    const [ email, setEmail ] = useState('Carrouf.fictif@entreprise.com');
    const [ password, setPassword ] = useState('password');
    const [ confirmPassword, setConfirmPassword ] = useState('password');
    const [ name, setName ] = useState('Carrouf');
    const [ proprietaire, setProprietaire ] = useState('El Patron');
    const [ address, setAddress ] = useState('Les Allues, 73550');
    const [ SIREN, setSIREN ] = useState('549204393944');
    const [ statusResp, setStatusResp ] = useState();
    const [ isEmpty, setIsEmpty ] = useState(false);

    const passwordMatch = password === confirmPassword;


    const handlePasswordRegex = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

        if(regex.test(password)){
            return true;
        }
        return false;
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
            name: name,
            proprietaire: proprietaire,
            email: email,
            password: password,
            SIREN: SIREN,
            address: address,
        }
        console.log("[REGISTER] user est:", user);
        
        await axios.post('http://localhost:8002/entreprise/register', user)
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
        <Header />
        <ScrollView>
            <KeyboardAvoidingView style={{width:"100%"}}>
            <Animated.View style={styles.inputContainer}  entering={FadeInRight.duration(700).delay(150)}>
                    <View style={styles.inputContent}>
                        <Text>E-mail</Text>
                        <InputLine 
                            value={email}
                            onChangeText={setEmail}
                            placeholder="E-mail"
                            security={false}
                            required={true}
                        />
                    </View >
                    <View style={styles.inputContent}>
                        <Text>Password</Text>
                        <InputLine 
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            security={true}
                            required={true}
                        />
                        <Text>Input Password 8 to 16 characters which contain at least 1 number, 1 uppercase.</Text>
                    </View>
                    <View style={styles.inputContent}>
                        <Text>Confirm password</Text>
                        <InputLine 
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Password"
                            security={true}
                            required={true}
                        />
                        {passwordMatch? null : <Text style={{color: "red"}}>Password does not match</Text>}
                    </View>
                    <View style={styles.inputContent}>
                    <Text>
                        Name
                    </Text>
                    <InputLine 
                        value={name}
                        onChangeText={setName}
                        placeholder="Firstname"
                        security={false}
                        required={true}
                    />
                    </View>
                    <View style={styles.inputContent}>
                        <Text>
                            Propietaire
                        </Text>
                        <InputLine 
                            value={proprietaire}
                            onChangeText={setProprietaire}
                            placeholder="Lastname"
                            security={false}
                            required={true}
                        />
                    </View>
                    <View style={styles.inputContent}>
                        <Text 
                        >
                            Address
                        </Text>
                        <InputLine 
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Address"
                            security={false}
                            required={true}
                        />
                    </View>
                    <View style={styles.inputContent}>
                        <Text 
                        >
                            SIREN
                        </Text>
                        <InputLine 
                            value={SIREN}
                            onChangeText={setSIREN}
                            placeholder="SIREN"
                            security={false}
                            required={true}
                        />
                    </View>
                    <Text style={{marginTop: 20,marginHorizontal:10}}> 
                    En cliquant sur Agree and sign up or on Continue, vous agree the 
                        <Pressable>
                            <Text style={{color: "blue"}}> Terms of Service </Text>
                        </Pressable>
                        , the 
                        <Pressable>
                            <Text style={{color: "blue"}}> Confidential service</Text>
                        </Pressable>
                        and the 
                        <Pressable>
                            <Text style={{color: "blue"}}> Cookies service </Text>
                        </Pressable>
                        of the application.
                    </Text>
                </Animated.View>
            </KeyboardAvoidingView>
            <View style={styles.submitContainer}>
                <Pressable style={styles.submitButton}  onPress={()=>handleRegister()} disabled={ !isEmpty? false : true}>
                    <Text style={styles.submitButtonText}>Agree and sign up</Text>
                </Pressable>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({
    inputContainer:{
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 15,
    },
    inputContent:{
        justifyContent: "start",
        gap: 4,
        width: "80%",
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
    submitContainer:{
        alignItems: "center",
        marginBottom: 30,
    },
})