// Path : app/(auth)/index.js
import { Pressable, StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import SubmitButton from '../components/Buttons/Submit';
import Slider from '../components/Swiper/Slider';

// 2 boutons : Saisonnier ou Entreprise

const onBoarding = () => {



  const router = useRouter();
  const navigation = useNavigation();
  

  const handleEntreprise=()=> {
    router.push("auth/(entreprise)");
  }

  const handleUser=()=> {
    router.push("auth/(user)");
  }

  return (
    <View style={styles.container}>
      <View style={{justifyContent:"flex-end", alignItems:"center",height:"70%"}}>
      <Slider />
        <Text style={styles.title}>What type of account do you have</Text>
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton title='ENTREPRISE' onPress={()=>handleEntreprise()}/>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", gap:10}}>
          <View style={{width:"40%", height:1, backgroundColor: "gray"}}></View>
          <Text style={styles.title}>Or</Text>
          <View style={{width:"40%", height:1, backgroundColor: "gray"}}></View>
        </View>
        <SubmitButton title='        USER        ' onPress={()=>handleUser()}/>
      </View>
    </View>
  )
}

export default onBoarding

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer:{
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonSaisonnier:{
    backgroundColor: "#ff9d2f",
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 20,
    color: "white",
  },
  buttonEntreprise:{
    backgroundColor: "#ff9d2f",
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 20,
    color: "white",
  },
  logo:{
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 100,
    marginBottom: 10,
  }
})