import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

const Cancel = () => {

    const navigation =useNavigation();

    const handlegoBack=()=>{
        console.log('[CANCEL]goBack')
    }

  return (
    <Pressable style={styles.container} onPress={()=> navigation.goBack()}>
      <Text style={styles.text}>Cancel</Text>
    </Pressable>
  )
}

export default Cancel

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#553D00',
        marginHorizontal: 24,

    },
    text:{
        color: '#EEAC00',
        fontSize: 20,
        fontWeight: 'bold'
    }
})