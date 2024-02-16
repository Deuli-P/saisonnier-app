import { StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import QRCode from "react-qr-code";

const qrcode = () => {
  
  const { userId } = useAuth();

  return (
    <SafeAreaView style={{alignItems:"center", justifyContent:"center", height:"100%"}}>
      <Text>QRCode</Text>
      <View style={{width:256, height:256}}>
        { userId ?
          <QRCode
          size={256}
          style={{ height: "100%", width: "100%" }}
          value={userId}
          viewBox={`0 0 256 256`}
          />
        : null 
        }
      </View>
    </SafeAreaView>
  )
}

export default qrcode

const styles = StyleSheet.create({})