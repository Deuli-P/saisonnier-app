import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

const Close = () => {

    const navigation =useNavigation();

  return (
    <Pressable style={styles.container} onPress={()=> navigation.goBack()}>
    <Text style={styles.text}>X</Text>
  </Pressable>
  )
}

export default Close

const styles = StyleSheet.create({
    container:{
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        color: 'black',
        fontSize: 32,
        fontWeight: 'bold'
    }
})