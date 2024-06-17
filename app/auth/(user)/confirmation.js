import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubmitButton from '../../../components/Buttons/Submit'
import { useRouter } from 'expo-router'
const confirmation = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.confirmationContainer}>
      <Text style={styles.confirmationText}>A Email was send to validate your register.</Text>
      </View>
      <SubmitButton title="Go to Login" onPress={()=>router.replace("/(auth)/login")}/>
    </View>
  )
}

export default confirmation

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242734",

  },
  confirmationContainer:{
    width: "70%",
    backgroundColor: "#ECE1E1",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderColor: "#759057",
    borderWidth: 2,
    marginBottom: 20,
  },
  confirmationText:{
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  }
})