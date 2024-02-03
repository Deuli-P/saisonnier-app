import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const _layout = () => {
    return (
      <Tabs>
          <Tabs.Screen 
            name='[user]' 
            options={{
              headerShown: false,
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
            name='QRCode' 
            options={{
              headerShown: false,
              tabBarLabel: "QRCode",
            tabBarLabelStyle:{...styles.tabBarLabel},
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              focused ?
              (<Ionicons name="scan-circle-sharp" size={24} color="black" />)
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