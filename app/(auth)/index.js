// Path : app/(auth)/index.js
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

// 2 boutons : Saisonnier ou Entreprise

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo}/>
        <Text style={styles.title}>Are you</Text>
      </View>
      <View style={styles.buttonContainer}>
      <Link href='(entreprise)' style={styles.buttonEntreprise}>Entreprise</Link>
      <Text style={styles.title}> Or </Text>
      <Link href='(saisonnier)' style={styles.buttonSaisonnier}>Saisonnier</Link>
      </View>
    </View>
  )
}

export default index

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
    marginBottom: 20,
  },
  buttonContainer:{
    alignItems: "center",
    justifyContent: "center",
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
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 100,
    marginBottom: 10,
  }
})