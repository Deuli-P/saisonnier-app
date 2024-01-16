import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, useSegments } from 'expo-router'

const conversation = () => {

  const rootSegment = useSegments()[0];

  console.log("[CONV] rootSegment:",rootSegment);

  return (
    <SafeAreaView>
      <Text>Conversation page</Text>
      <Link href='/(app)/(tabs)/home' >
        <Text>Go to tabs</Text>
      </Link>

    </SafeAreaView>
  )
}

export default conversation

const styles = StyleSheet.create({})