import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { Slot } from 'expo-router'
import { AuthProvider } from './context/AuthContext';
import onBoarding from './onBoarding';
import { Roboto_400Regular,Roboto_500Medium,Roboto_700Bold } from '@expo-google-fonts/roboto'

const Layout = () => {

  return (
    <>
      <StatusBar barStyle={{color:"auto"}} />
      <AuthProvider >
        <Slot />
      </AuthProvider>
    </>
  )
}

export default Layout

const styles = StyleSheet.create({})