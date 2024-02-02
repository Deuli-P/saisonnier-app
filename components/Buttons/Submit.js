import { StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'

const SubmitButton = ({title, onPress}) => {



  // envoi du formulaire vers le backend 'post'
  const handlePost = () => {
    console.log('[SUBMITBUTTON]Post')
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFB800',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    text: {
        color: '#FFE399',
        fontSize: 20,
        fontWeight: 'bold'
    }
})