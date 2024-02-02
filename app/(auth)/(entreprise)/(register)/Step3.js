import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import RegisterFormStep from '../../../../components/Buttons/RegisterFormStep';
import InputLine from '../../../../components/Input/InputLine';
import Animated, {FadeInRight} from 'react-native-reanimated';


const Step3 = ({data}) => {
    // emplyeur
    // contract number
    // job title
  return (
    <View 
      style={{width:'100%'}} 
    >
        <KeyboardAvoidingView style={styles.inputContainer}>
      <Animated.View style={styles.inputContent}       entering={FadeInRight.duration(700).delay(200)}
>
                    <Text 
                    >
                        Address
                    </Text>
                    <InputLine 
                        value={data.address}
                        onChangeText={data.setAddress}
                        placeholder="Address"
                        security={false}
                        required={true}
                    />
                </Animated.View>
        </KeyboardAvoidingView>
      <RegisterFormStep data={data}/>
    </View>
  )
}

export default Step3

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
})