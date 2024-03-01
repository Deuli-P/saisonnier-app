import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InputFake = ({value, title}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{title}:</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.input}>{value? value: "Value"}</Text>
        </View>
    </View>
  )
}

export default InputFake

const styles = StyleSheet.create({
    container: {
        gap:5
    },
    label: {
        fontSize: 18,
        color: "#ECE1E1"
    },
    inputContainer: {
        backgroundColor: '#767592',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
    },
    input: {
        fontSize: 18,
        color: 'black',
    }
})