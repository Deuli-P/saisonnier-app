import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import RegisterFormStep from '../../../../components/Buttons/RegisterFormStep';
import InputLine from '../../../../components/Input/InputLine';
import Animated, {FadeInRight} from 'react-native-reanimated';

const Step4 = ({data}) => {

   // SIREN 
   // Contract Number
  return (
    <Animated.View 
      style={{width:'100%'}} 
      entering={FadeInRight.duration(700).delay(200)}
    >
        <KeyboardAvoidingView style={styles.inputContainer}>
      <View style={styles.inputContent}>
                    <Text 
                    >
                        SIREN
                    </Text>
                    <InputLine 
                        value={data.SIREN}
                        onChangeText={data.setSIREN}
                        placeholder="SIREN"
                        security={false}
                        required={true}
                    />
                </View>
        </KeyboardAvoidingView>
    </Animated.View>
  )
}

export default Step4

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