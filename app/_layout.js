import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { Slot } from 'expo-router'
import { AuthProvider } from './context/AuthContext';
import onBoarding from './onBoarding';

const Layout = () => {

  return (
      <AuthProvider >
        <Slot />
      </AuthProvider>
  )
}

export default Layout

const styles = StyleSheet.create({})