import { StyleSheet, TextInput, View, Text } from 'react-native'
import { useState } from 'react'

const InputLine = ({width, onChangeText, value, placeholder, security,required, disabled,label}) => {

    const [focused, setFocused] = useState(false);

    const styles = StyleSheet.create({
        input: {
            color: disabled ?"#D9C5C5" :"#1C1C1C",
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 3,
            backgroundColor: disabled ?"#767592" :"#BBBBC0",
          },
    })

  return (

          <View
          style={{
            width: "100%",
            justifyContent: "start",
            gap: 4,
          }}
          >
            <Text
            style={{

            }}
            >
              {label} :
            </Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => onChangeText(text)}
              placeholder={placeholder}
              secureTextEntry={security}
              onFocus={() => setFocused(true)}
              onSubmitEditing={() => setFocused(false)}
              onEndEditing={() => setFocused(false)}
              required={required}
              disabled={disabled}
              />
          </View>

  )
}

export default InputLine
