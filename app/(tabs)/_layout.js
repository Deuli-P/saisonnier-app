import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
          name='home' 
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle:{...styles.tabBarLabel},
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              focused ?
                  (<Ionicons name="home" color="black" size={24}/>)
                :
                  (<Ionicons name="home-outline" color="gray" size={24}/>)
            ),
          }}  
          />
        <Tabs.Screen 
          name='post' 
          options={{
            tabBarLabel: "Post",
            tabBarLabelStyle:{...styles.tabBarLabel},
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              focused ?
                  (<MaterialCommunityIcons name="post" color="black" size={24}/>)
                :
                  (<MaterialCommunityIcons name="post-outline" color="gray" size={24}/>)
            ),
          }}  
          />
        <Tabs.Screen 
          name='conversation' 
          options={{
            tabBarLabel: "Tchat",
            tabBarLabelStyle:{...styles.tabBarLabel},
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              focused ?
                  (<FontAwesome name="comment" color="black" size={24}/>)
                :
                  (<FontAwesome name="comment-o" color="grey" size={24}/>)
            ),
          }}  
          />
    </Tabs>
  )
}

export default Layout;

const styles = StyleSheet.create({
  tabBarLabel:{
    fontSize: 12,
    color: "#008E97"
  }
})