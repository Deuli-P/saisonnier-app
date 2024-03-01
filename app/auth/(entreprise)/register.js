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
    <SafeAreaView style={{flex:1, backgroundColor:"#242734",alignItems:"center"}}>
        <ScrollView style={{width:"100%", paddingHorizontal: 15}}>
            <Header />
            <KeyboardAvoidingView>
            <Animated.View style={{width:"100%",alignItems:"center"}}  entering={FadeInRight.duration(700).delay(150)}>
                <View style={styles.inputContainer}>
                    <View style={{width:"85%",gap:11}}>
                        <InputLine 
                            value={email}
                            onChangeText={setEmail}
                            placeholder="E-mail"
                            security={false}
                            required={true}
                            label={"Email"}
                            />
                        <View style={styles.inputContent}>
                            <InputLine 
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Password"
                                security={true}
                                required={true}
                                label={"Password"}
                                />
                            <Text style={{color: handlePasswordRegex ? "red": "green"}}>Input Password 8 to 16 characters which contain at least 1 number, 1 uppercase.</Text>
                        </View>
                        <View style={styles.inputContent}>
                            <InputLine 
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Password"
                                security={true}
                                required={true}
                                label={"Confirm Password"}
                                />
                            {passwordMatch? null : <Text style={{color: "red"}}>Password does not match</Text>}
                        </View>
                        <InputLine 
                            value={name}
                            onChangeText={setName}
                            placeholder="Firstname"
                            security={false}
                            required={true}
                            label={"Name"}
                            />
                        <InputLine 
                            value={proprietaire}
                            onChangeText={setProprietaire}
                            placeholder="Lastname"
                            security={false}
                            required={true}
                            label={"Owner"}
                            />
                        <InputLine 
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Address"
                            security={false}
                            required={true}
                            label={"Address"}
                            />
                        <InputLine 
                            value={SIREN}
                            onChangeText={setSIREN}
                            placeholder="SIREN"
                            security={false}
                            required={true}
                            label={"SIREN"}
                            />
                        <Text style={{textAlign:"left", marginBottom: 20}}> 
                            By registering, you agree to the
                            <Text style={{color: "blue",textAlign:"justify"}} onPress={()=> console.log("click Term of use")}> Terms of use </Text>
                            and the utilization of your data by
                            <Text style={{color: "blue"}} onPress={()=> console.log("click Our Partners")}> our partners </Text>
                            .
                        </Text>
                        </View>
                    </View>
                </Animated.View>
            </KeyboardAvoidingView>
            <View style={styles.submitContainer}>
                <View style={{ bottom: 30, position:"absolute", width:"80%"}}>
                    <Pressable style={[styles.submitButton,{ backgroundColor:"#E37322", borderLeftColor:'#4C7D9F'}]} onPress={()=> handleRegister()} >
                        <Text style={styles.submitButtonText}>Agree and Register</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical: 30,
        backgroundColor: "#ECE1E1",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        shadowOffset:{
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        shadowColor: "#ECE1E1",
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContent:{
        justifyContent: "start",
        gap: 4,
        width: "100%",
    },
    input:{
        color:"gray",
        width: 250,
    },
    inputIcon:{
        marginLeft: 10,
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
        borderLeftWidth: 3,
      },
      submitButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    submitContainer:{
        position:"relative",
        justifyContent:"center",
        alignItems:"center",
        position: "relative",
        height: 30,
      },
})