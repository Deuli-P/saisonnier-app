import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
          name='entreprise' 
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle:{...styles.tabBarLabel},
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              focused ?
              (<FontAwesome name="address-card" size={24} color="black" />)
              :
              (<FontAwesome name="vcard-o" size={24} color="black" />)
              ),
            }} 
          />
        <Tabs.Screen 
          name='scanner' 
          options={{
            tabBarLabel: "Scanner",
            tabBarLabelStyle:{...styles.tabBarLabel},
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              focused ?
              (<Ionicons name="scan-circle" size={24} color="black" />)
              :
              (<Ionicons name="scan-circle-outline" size={24} color="black" />)
              ),
            }} 
          />
    </Tabs>
  )
}

export default _layout


const styles = StyleSheet.create({
  tabBarLabel:{
    fontSize: 10,
    color: "#008E97"
  }
})