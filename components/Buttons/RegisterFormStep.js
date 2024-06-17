import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubmitButton from './Submit';

const RegisterFormStep = ({data}) => {
  return (
    <View style={{width:"100%", justifyContent:"space-between", flexDirection: "row", paddingHorizontal: 20,marginTop:20,}}>
        <SubmitButton title="Previous" onPress={() => data.handlePreviousStep()} />
        <SubmitButton title="Next" onPress={() => data.handleNextStep()} />
    </View>
  )
}

export default RegisterFormStep

const styles = StyleSheet.create({})