import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSegments} from "expo-router";
import { useAuth } from '../../app/context/AuthContext';
import SubmitButton from './Submit';
const Logout = () => {

  const rootSegmentType = useSegments()[1];


    const { logout } = useAuth();
  return (
    <SubmitButton title="Logout" onPress={()=>logout()} />
  )
}

export default Logout

const styles = StyleSheet.create({})