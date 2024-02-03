import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../app/context/AuthContext';
import SubmitButton from './Submit';
const Logout = () => {

    const { logout } = useAuth();
  return (
    <SubmitButton title="Logout" onPress={()=>logout()} />
  )
}

export default Logout

const styles = StyleSheet.create({})