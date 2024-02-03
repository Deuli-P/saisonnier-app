import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const errorModal = ({code}) => {

    const [message, setMessage] = useState("")
    if(code === 505){
        setMessage("Internal server error. Try again later.")
    }
    if(code === 404){
        setMessage("Not found. Try again later.")
    }
    if(code === 401){
        setMessage("Unauthorized. Try again later.")
    }
    
  return (
    <View style={styles.container}>
      <Text>Error</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

export default errorModal

const styles = StyleSheet.create({
    container:{
        width:"70%",
        height:"auto",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroudColor: "#ea4258",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        poistion: "absolute",
    },
    message:{
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    }
})