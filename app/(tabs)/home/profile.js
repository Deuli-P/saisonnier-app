import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';


const profile = () => {

    const { user } = useLocalSearchParams();

    console.log("[PROFILE] user:", user);

  return (
    <View>
      <Text>Profile page de {user?.firstname} {user?.lastname}</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})
