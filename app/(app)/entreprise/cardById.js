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
    <SafeAreaView style={styles.global}>
      <View style={styles.container}>
        <View style={{height: 3, width: "40%", backgroundColor:'white',marginTop:15,borderRadius:20}}></View>
        <View style={{marginTop: 50}}>
          <Image source={{uri: params.image}} style={styles.image} />
        </View>
        <View style={{marginTop:50, gap:20}}>
            <View style={styles.infoContainer}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.textContainer}>{params.firstname} {params.lastname}</Text>
          </View>
            <View style={styles.infoContainer}>
            <Text style={styles.title}>Entreprise</Text>
            <Text style={styles.textContainer}>{params.entreprise? params.entreprise: "Entreprise ici"}</Text>
          </View>
        </View>

        <Pressable onPress={()=>{handleBackScanner()}}
                  style={{justifyContent:"center", alignItems:"center", marginTop:60, backgroundColor:"#ff9d2f", padding:15, borderRadius:50}}
        >
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default cardById

const styles = StyleSheet.create({
  global:{
    backgroundColor: "black",
    paddingTop:20,
  },
  container:{
    width:'100%',
    height:'100%',
    backgroundColor: "#242734",
    alignItems:"center",
    justifyContent:'beteween',
  },
  image:{
    width: 200,
    height: 200,
    borderRadius: 10
  },
  infoContainer:{
    flexDirection:"col",
    alignItems:"center",
    gap: 5,
  },
  textContainer:{
    backgroundColor: "#BBBBC0",
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 50,
    color: "#242734",
    fontSize: 16,
    fontWeight: "bold",
  },
  title:{
    color:"#E6DCCD",
    fontWeight: "bold",
    fontSize: 16,
  }
})