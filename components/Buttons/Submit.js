import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubmitButton = ({text, action}) => {


  return (
    <View style={styles.container} onPress={action}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFB800',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})