// Path: app/auth/_layout.js
import { Stack } from 'expo-router'

export default function _layout(){

  return (
    <Stack >
         {/* entreprise pages login/ register */}
        <Stack.Screen name='(entreprise)' options={{headerShown: false, presentation: "modal"}}/>
        {/* user pages login/ register */}
        <Stack.Screen name='(user)' options={{headerShown: false, presentation: "modal"}}/>
    </Stack>
  )
}
