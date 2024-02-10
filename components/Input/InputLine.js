import { StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'

const InputLine = ({width, onChangeText, value, placeholder, security,required, disabled}) => {

    const [focused, setFocused] = useState(false);
    const styles = StyleSheet.create({
        input: {
            color: focused ?"black": "gray",
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderColor: "#ff9d2f",
            borderWidth: 1,
            borderRadius: 3,
          },
    })

  return (
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
  )
}

export default InputLine
