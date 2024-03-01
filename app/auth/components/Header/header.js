import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import {useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
const Header = ({ url, formType, accountType}) => {

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
           
            <Pressable onPress={()=> router.push("onBoarding")}>
                <AntDesign name="close" size={44} color="#ECE1E1"/>
            </Pressable>
            <Pressable onPress={() => handleRedirect()}>
            <Animated.Text style={styles.redirectionText} entering={FadeIn.duration(200)}>
              {rootSegmentForm === "register"? "Sign in" : "Sign up"}
            </Animated.Text>
          </Pressable>
        </View>
        <View>
          <Text style={[styles.titleText, {color: "#ECE1E1",textAlign:"left"}]}>
            {rootSegmentForm === "register"? "Register" : "Login"}
          </Text>
            <Text style={[styles.titleText, {color:  rootSegmentType==='(entreprise)'? "#EE9E25": "#7D9AAA", textAlign:"right" }]}>
              {rootSegmentType==='(entreprise)'? "Entreprise": "User" }</Text>
        </View>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
    logoContainer: {
        marginTop: 20,
        width: "100%",
      },
    redirectionText: {
        color: "#E37322",
        fontWeight: "bold",
        fontSize: 24,
      },
      titleText: {
        fontSize: 58,
        fontWeight: "bold",
      },
})