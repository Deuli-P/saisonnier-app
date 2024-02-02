import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, useSegments } from 'expo-router'
import { useAuth } from '../../context/AuthContext'

const conversation = () => {

  const { logout} = useAuth();

  const rootSegment = useSegments()[0];

  console.log("[CONV] rootSegment:",rootSegment);

  return (
    <SafeAreaView>
      <Text>Conversation page</Text>
      <Link href='/(app)/(tabs)/home' >
        <Text style={{flex:1, width:100,height: 35, backgroundColor:"purple", textAlign:"center", color: "white"}}>Go to tabs</Text>
      </Link>
      <Pressable style={{paddingHorizontal:12, paddingVertical:8, backgroundColor:"purple", marginTop: 20}} onPress={()=> logout()}>
        <Text style={{color: "white"}}>Logout</Text>
      </Pressable>

    </SafeAreaView>
  )
}

export default conversation

const styles = StyleSheet.create({})