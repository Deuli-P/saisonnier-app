import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import {useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
const Header = () => {

    const router = useRouter();
    const rootSegmentType = useSegments()[1];
    const rootSegmentForm = useSegments()[2];

    const [ authType, setAuthType ] = useState();
    const [ redirectType, setRedirectType ] = useState();
    const [ redirectForm, setRedirectForm ] = useState();

    // si dans (entreprise)/login
            // authType = entreprise
            // redirectType = (entreprise)
            // redirectForm = (register)
    useEffect(() => {
        if(rootSegmentType === "(entreprise)"){
            setAuthType('Entreprise')
        }
        else if(rootSegmentType === "(user)"){
            setAuthType('User')
            if(rootSegmentForm === "login"){
                setRedirectForm('login')
            }
            else{
                setRedirectForm('register')
            
            }
        }
    }, [rootSegmentType, rootSegmentForm]);

    const handleRedirect = () => {
        // si on est dans register alors pas /auth/{rootSegmentType}/login 
        router.replace(`/auth/${ rootSegmentType }/${ rootSegmentForm === "register" ? 'login' : `register`}`)
        // si login alors /auth/{rootSegmentType}/(register)
    }


  return (
    <View style={styles.logoContainer}>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:'space-between'}}>
            <Image
            style={styles.logo}
            source={
                require("../../../../assets/logo.png")
            }
            />
            <Pressable onPress={()=> router.back()} style={{marginRight: 30,}}>
                <Entypo name="cross" size={44} color="black"/>
            </Pressable>
        </View>
          <Text style={styles.titleText}>Sign up on {rootSegmentType==='(entreprise)'? "Entreprise": "User" } account</Text>
          <View style={{flexDirection:"row", alignItems: "center"}}>
            <Text>or </Text>
          <Pressable onPress={() => handleRedirect()}>
            <Animated.Text style={styles.redirectionText} entering={FadeIn.duration(200)}>
              {rootSegmentForm === "register"? "Sign in" : "Sign up"}
            </Animated.Text>
          </Pressable>
          </View>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
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
    redirectionText: {
        color: "#ff9d2f",
        fontWeight: "bold",
        fontSize: 18,
      },
      titleText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        color: "#fca311",
      },
})