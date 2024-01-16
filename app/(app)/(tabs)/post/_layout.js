import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index' />
      <Stack.Screen name='modalEvent' options={{presentation:"modal"}}/>
      <Stack.Screen name='modalMedia' options={{presentation:"modal"}}/>
      <Stack.Screen name='modalSondage' options={{presentation:"modal"}}/>

    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})