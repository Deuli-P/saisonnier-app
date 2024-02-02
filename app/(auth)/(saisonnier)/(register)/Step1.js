import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import {useState} from 'react'
import {Entypo, MaterialCommunityIcons, MaterialIcons, AntDesign, Foundation } from '@expo/vector-icons';
import InputLine from '../../../../components/Input/InputLine';


const Step1 = ({data}) => {


    // firstname
    // lastname
    // email
    // age
    // sexe
  return (
    <View style={{alignItems:"center"}}>
        <KeyboardAvoidingView style={{width:"100%"}}>
            <View style={styles.inputContainer}>
                <View style={styles.inputContent}>
                    <Text>
                        E-mail
                    </Text>
                    <InputLine 
                        value={data.email}
                        onChangeText={data.setEmail}
                        placeholder="E-mail"
                        security={false}
                        required={true}
                    />
                </View>
                { data.isAgree ?
                        (<View style={styles.inputContent}>
                            <Text>
                        Password
                    </Text>
                    <InputLine 
                        value={data.password}
                        onChangeText={data.setPassword}
                        placeholder="Password"
                        security={true}
                        required={true}
                    />
                        </View> )
                    :
                    ( <Text style={{marginTop: 20,marginHorizontal:10,}}> 
                        En cliquant sur Agree and sign up or on Continue, vous agree the 
                            <Pressable>
                                <Text style={{color: "blue"}}> Terms of Service </Text>
                            </Pressable>
                            , the 
                            <Pressable>
                                <Text style={{color: "blue"}}> Confidential service</Text>
                            </Pressable>
                            and the 
                            <Pressable>
                                <Text style={{color: "blue"}}> Cookies service </Text>
                            </Pressable>
                            of the application.
                        </Text>
                        ) 
                    }
                </View>
            </KeyboardAvoidingView>
            { !data.isAgree  ?
            <Pressable style={styles.submitButton} onPress={()=>data.setIsAgree(!data.isAgree)}>
                <Text style={styles.submitButtonText}>Agree and sign up</Text>
            </Pressable>
            :
            <Pressable style={styles.submitButton} onPress={()=>data.handleNextStep()}>
                <Text style={styles.submitButtonText}>Continue</Text>
            </Pressable>
            }
    </View>
  )
}

export default Step1

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
        width: 200,
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
