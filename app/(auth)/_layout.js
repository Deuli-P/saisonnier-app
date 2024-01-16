import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const layout = () => {
  return (
    <Stack>
        {/* Page login */}
        <Stack.Screen name='login' options={{headerShown: false}}  />
        {/* Page register */}
        <Stack.Screen name='register' options={{headerShown: false}} />
    </Stack>
  )
}

export default layout

const styles = StyleSheet.create({})