import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import SubmitButton from '../../../../components/Buttons/Submit'

const errorRegister = () => {
  
  const params = useLocalSearchParams()
  const [ isAlreadyUse, setIsAlreadyUse ] = useState(false)
  const [ text, setText ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  
  const [ status, setStatus ] = useState(params.status)


  useEffect(()=> {
    console.log("[ERRORREGISTER;UseEffect] status:", status);
    try{
      if(status === "400"){
        setIsLoading(false)
        console.log("[ERRORREGISTER] error est 400");
        setText('A Account is already assign to this email or this contract number.')
        setIsAlreadyUse(true)
      }
      else if(status === "401"){
        setIsLoading(false)
        setText('The Contract Number is not valid. Retry again or please contact your employeur.')
        console.log("[ERRORREGISTER] error est 401");
      }
      else if(status === "402"){
        setIsLoading(false)
        console.log("[ERRORREGISTER] error est 402");
        setText('The SIREN is not valid. Retry again or please contact your employeur.')
      }
      else{
        setIsLoading(false)
        console.log("[ERRORREGISTER] error est 500");
        setText('Internal Server Error. Try again later.')
      }
    }
    catch(err){
      console.log("[ERRORREGISTER] error est:", err);
    }
  },[status])


  const handleForgetPassword = () => {
    Alert.alert('Component is not implemented yet.');
    router.replace("/(auth)/login");
  }


  return (
     isLoading?
        
          <View style={styles.container}>
            <Text style={styles.isLoading}>Loading...</Text>
          </View>
      :
          <View style={styles.container}>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{text}</Text>
            </View>
            { isAlreadyUse ?
              <SubmitButton title="Forget Password" onPress={handleForgetPassword}/>
              :
                (<Link style={styles.errorButton} href={'/(auth)/(register)/index'}>
                  <Text style={styles.errorButtonText}>Back</Text>
                </Link>)
              }
          </View>
        
    
  )
}

export default errorRegister

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorContainer:{
    width: "70%",
    backgroundColor: "#ea4258",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderColor: "red",
    borderWidth: 2,
    marginBottom: 20,
  },
  errorText:{
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  errorButton:{
    marginTop: 20,
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 45,
    textAlign: "center",
  },
  errorButtonText:{
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  isLoading:{
    fontSize: 26,
    fontWeight: "bold",
  }
})