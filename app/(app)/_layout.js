import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack 
        initialRouteName='(tabs)'
    >
        {/* Page ou naviguer */}
        <Stack.Screen name='(tabs)' options={{headerShown: false}}  />
        {/* Page conversation / les conversations privées et en groupe */}
        <Stack.Screen name='(conv)' options={{headerShown: false}}  />
    </Stack>
  )
}

export default Layout

