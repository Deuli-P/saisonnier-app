import { StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const QRCode = () => {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={{alignItems:"center", justifyContent:"center", height:"100%"}}>
      <Text>QRCode</Text>
      <Pressable style={{paddingHorizontal:12, paddingVertical: 6, backgroundColor: 'red', borderRadius: 5, marginTop:20}} onPress={()=>logout()}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default QRCode

const styles = StyleSheet.create({})