import { StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'

const SubmitButton = ({title, onPress, typeAccount}) => {



  // envoi du formulaire vers le backend 'post'
  const handlePost = () => {
    console.log('[SUBMITBUTTON]Post')
  }

  return (
    <Pressable style={[styles.container,{backgroundColor:typeAccount= "entreprise"? "#E37322": "#4C7D9F", borderLeftColor: typeAccount ="entreprise"? "#4C7D9F" : "#E37322"}]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        borderLeftWidth:2,
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    text: {
        color: '#ECE1E1',
        fontSize: 24,
        fontWeight: 'bold'
    }
})