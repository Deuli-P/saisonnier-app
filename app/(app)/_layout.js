import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const _layout = () => {
    return (
      <Stack>
          <Stack.Screen 
            name='user' 
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name='entreprise' 
            options={{headerShown: false}}
          />
      </Stack>
    )
  }
  
  export default _layout

const styles = StyleSheet.create({
  tabBarLabel:{
    fontSize: 10,
    color: "#008E97"
  }
})