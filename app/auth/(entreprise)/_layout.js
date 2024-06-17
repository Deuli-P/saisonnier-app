import { Stack } from 'expo-router'

const Layout =()=>{
  return (
    <Stack>
        {/* Page login */}
        <Stack.Screen name="login" options={{headerShown: false}}  />
        {/* Page register */}
        <Stack.Screen name="register" options={{headerShown: false}} />

        <Stack.Screen name="confirmation" options={{headerShown: false}} />
        <Stack.Screen name="errorRegister" options={{headerShown: false}} />
    </Stack>
  )
}

export default Layout
