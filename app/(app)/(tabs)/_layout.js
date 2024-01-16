import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
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
                (<Ionicons name="home-outline" color="gray" size={18}/>)
                ),
              }}  
              />
          <Tabs.Screen 
            name='connections' 
            options={{
              tabBarLabel: "Connections",
              tabBarLabelStyle:{...styles.tabBarLabel},
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                focused ?
                (<FontAwesome5 name="user-friends" color="black" size={24}/>)
                :
                (<FontAwesome5 name="user-friends" color="gray" size={18}/>)
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
                (<MaterialCommunityIcons name="post-outline" color="gray" size={18}/>)
                ),
              }}  
              />
          <Tabs.Screen 
            name='notifications' 
            options={{
              tabBarLabel: "Notifications",
              tabBarLabelStyle:{...styles.tabBarLabel},
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                focused ?
                (<FontAwesome name="bell" color="black" size={24}/>)
                :
                (<FontAwesome name="bell-o" color="grey" size={18}/>)
                ),
              }}  
            />
          <Tabs.Screen 
            name='jobOffers' 
            options={{
              tabBarLabel: "Offre emplois",
              tabBarLabelStyle:{...styles.tabBarLabel},
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                focused ?
                (<Ionicons name="briefcase" color="black" size={24}/>)
                :
                (<Ionicons name="briefcase-outline" color="grey" size={18}/>)
                ),
              }}  
            />
      </Tabs>
  )
}

export default Layout;

const styles = StyleSheet.create({
  tabBarLabel:{
    fontSize: 10,
    color: "#008E97"
  }
})