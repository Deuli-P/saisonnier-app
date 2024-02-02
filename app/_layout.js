import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { Slot } from 'expo-router'
import { AuthProvider } from './context/AuthContext';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";

const Layout = () => {

  return (
    <ThemeProvider theme={DarkTheme}>
      <AuthProvider >
          <Slot />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default Layout

const styles = StyleSheet.create({})