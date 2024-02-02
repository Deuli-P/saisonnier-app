import React from 'react'
import {Stack } from 'expo-router';

const layout = () => {

  return (
    <Stack>
      {/* Page Debut */}
      <Stack.Screen name='index' options={{headerShown: false}}  />
      {/* Page de fin */}
      <Stack.Screen name='confirmation' options={{headerShown: false}} />
      <Stack.Screen name='errorRegister' options={{headerShown: false}} />
    </Stack>
  )
}

export default layout