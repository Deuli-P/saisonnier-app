import { ScrollView, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect} from 'react'
import { Link, Redirect, useRouter, useNavigation } from 'expo-router';
import InputLine from '../../../components/Input/InputLine';
import Animated, {FadeInRight} from 'react-native-reanimated';
import Header from '../components/Header/header';

// Mettre un slider pour plusieurs etape de register
// Mettre un bouton pour passer a l'etape suivante
    // Premiere page: email , password, username,
    // Deuxieme page: firstname, lastname, age, adresse, numero de telephone
    // Troisieme page: employeur, numero de contrat(required)
    // Quatrieme page: image de profil, description

const register = () => {


    const [ email, setEmail ] = useState('drigdark.poubelle@gmail.com');
    const [ password, setPassword ] = useState('password');
    const [ confirmPassword, setConfirmPassword ] = useState('password');
    const [ firstname, setFirstname ] = useState('Test');
    const [ lastname, setLastname ] = useState('Tester');
    const [ address, setAddress ] = useState('Les Allues, 73550');
    const [ contractNumber, setContractNumber ] = useState('AR94320DDIFE30');
    const [ statusResp, setStatusResp ] = useState();

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
        setConfirmPassword('');
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
            contrat: contractNumber,
            address: address,
        }
        console.log("[REGISTER] user est:", user);
        
        await axios.post('http://localhost:8002/user/register', user)
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
                                value={firstname}
                                onChangeText={setFirstname}
                                placeholder="Enter your firstname"
                                security={false}
                                required={true}
                                label={"Firstname"}
                                />
                            <InputLine 
                                value={lastname}
                                onChangeText={setLastname}
                                placeholder="Enter your lastname"
                                security={false}
                                required={true}
                                label={"Lastname"}
                                />
                            <InputLine 
                                value={address}
                                onChangeText={setAddress}
                                placeholder="enter your city"
                                security={false}
                                required={true}
                                label={"Address"}
                                />
                            <InputLine 
                                value={contractNumber}
                                onChangeText={setContractNumber}
                                placeholder="enter your contract number"
                                security={false}
                                required={true}
                                label={"Contract Number"}
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
                        <Pressable style={[styles.submitButton,{ backgroundColor:"#4C7D9F", borderLeftColor:'#E37322'}]} onPress={()=> handleRegister()} >
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