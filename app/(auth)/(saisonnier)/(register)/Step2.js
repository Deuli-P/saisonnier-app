import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import RegisterFormStep from '../../../../components/Buttons/RegisterFormStep';
import InputLine from '../../../../components/Input/InputLine';


const Step2 = ({data}) => {

  return (
    <View style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.inputContainer}>
                <View style={styles.inputContent}>
                    <Text>
                        Firstname
                    </Text>
                    <InputLine 
                        value={data.firstname}
                        onChangeText={data.setFirstname}
                        placeholder="Firstname"
                        security={false}
                        required={true}
                    />
                </View>
                <View style={styles.inputContent}>
                    <Text>
                        Lastname
                    </Text>
                    <InputLine 
                        value={data.lastname}
                        onChangeText={data.setLastname}
                        placeholder="Lastname"
                        security={false}
                        required={true}
                    />
                </View>
        </KeyboardAvoidingView>
         <RegisterFormStep data={data}/>
    </View>
  )
}

export default Step2

const styles = StyleSheet.create({
    inputContainer:{
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 15,
    },
    inputContent:{
        justifyContent: "start",
        gap: 4,
        width: "80%",
    },
    submitButton:{
        backgroundColor: "#ff9d2f",
        width: 140,
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    submitButtonText:{
        color: "white",
        fontWeight: "bold",
    },
})