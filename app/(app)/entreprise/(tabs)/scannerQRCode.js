import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

const scannerQRCode = () => {

  const [ scanned, setScanned ] = useState("valid");

  const [ show , setShow ] = useState();

  // lancement du scanner loading == true 
  const [ loading, setLoading ] = useState(false);


  // si scanner en cours de fetch loading element

  // si scanner valid fetch petit setTimer avant redirect et affichage d'un valid check

  // si scanner non valid fetch petit setTimer avant redirect et affichage d'un invalid check
  useEffect(() => {
    
  }, []);

  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.view}>
      <Text>Scan the QRCode</Text>
      <View style={styles.scannerContainer}>
      </View>
      <View>
        <View style={styles.checkContainer}>
            { scanned === "valid"? <MaterialIcons name="check" size={48} color="green" /> : null}
            { scanned === "error"? <MaterialIcons name="error" size={48} color="red" /> : null}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default scannerQRCode

const styles = StyleSheet.create({
  view:{
    alignItems:"center",
    justifyContent:"center",
    height:"100%"
  },
  scannerContainer:{
    width: 250,
    height: 250,
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "black",
    marginVertical: 50,
  },
  checkContainer:{
    width: 70,
    height: 70,
    backgroundColor: "gray",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  }
})