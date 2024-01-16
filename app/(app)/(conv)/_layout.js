import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {

  // page pour afficher la liste des conversations
  // page pour afficher une conversation
  // modal pour creer une conversation
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index' />
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})
