import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router'

const cardById = () => {

  const params = useLocalSearchParams();

  console.log("[CardById] user local params:", params.firstname);

  const router = useRouter();


  const handleBackScanner=()=>{
    router.back()
  }

  useEffect(() => {
    console.log("[CardById] params local:", params)
  }, [params])

  return (
    <SafeAreaView style={{alignItems:"center",backgroundColor: "#242734"}}>
      <View style={{marginTop: 50}}>
        <Image source={{uri: params.image}} style={{width: 200, height: 200, borderRadius: 10}} />
      </View>
      <View style={{marginTop:50, gap:20}}>
          <View style={{flexDirection:"row", gap:10}}>
          <Text>Name:</Text>
          <Text>{params.firstname} {params.lastname}</Text>
        </View>
          <View style={{flexDirection:"row", gap:10}}>
          <Text>Entreprise:</Text>
          <Text>{params.entreprise? params.entreprise: "Entreprise ici"}</Text>
        </View>
          <View style={{flexDirection:"row", gap:10}}>
          <Text>Adresse:</Text>
          <Text>{params.address? params.address: "Adresse ici"}</Text>
        </View>
      </View>

      <Pressable onPress={()=>{handleBackScanner()}}
                 style={{justifyContent:"center", alignItems:"center", marginTop:20, backgroundColor:"#ff9d2f", padding:10, borderRadius:50}}
      >
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  )
}

export default cardById

const styles = StyleSheet.create({})