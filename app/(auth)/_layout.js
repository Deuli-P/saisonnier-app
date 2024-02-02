// Path: app/(auth)/_layout.js
import { Stack } from 'expo-router'
import index from '.'

export default function Layout(){

  return (
    <Stack initialRouteName='index'>
        // vers saisonniers ou entreprise
        <Stack.Screen name='index' options={{headerShown: false}}/>
        // vers login ou register des entreprises
        <Stack.Screen name='(entreprise)' options={{headerShown: false}}/>
        // vers login ou register des saisonniers
        <Stack.Screen name='(saisonnier)' options={{headerShown: false}}/>
    </Stack>
  )
}
