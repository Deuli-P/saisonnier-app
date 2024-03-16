import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSegments} from "expo-router";
import { useAuth } from '../../app/context/AuthContext';
import SubmitButton from './Submit';
const Logout = () => {

  const rootSegmentType = useSegments()[1];


    const { logout } = useAuth();
  return (
    <View style={{marginTop:30, marginBottom:100}}>
      <SubmitButton title="Logout" onPress={()=>logout()} />
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
  
})