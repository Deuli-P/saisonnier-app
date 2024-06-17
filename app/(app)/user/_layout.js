import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const _layout = () => {
    return (
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom:0,
            left:0,
            right:0,
            height:72,
            elevation:0,
            backgroundColor: '#242734',
            opacity: 0.9,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 2
          }
        }}
      >
        <Tabs.Screen 
          name='profile' 
          options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {

            const [ position ] = useState(useSharedValue(focused ?-20: 0))
            const [ color ] = useState(useSharedValue(focused ?"#4C7D9F": "transparent"))

            const animatedStyle = useAnimatedStyle(()=>{
              return{
                transform: [{translateY: position.value}],
                backgroundColor: color.value ,
              }
            },)
            //  si focused est true alors carré devient opacity 1 et translateY 100
            return(

              <Animated.View style={[styles.tabBarIconContainer,animatedStyle]}>
                {focused ?
                    (
                      <FontAwesome name="address-card" size={24} color="white" />
                    )
                  :
                    (
                      <FontAwesome name="vcard-o" size={24} color="white" />
                    )
                }
                <Text style={{color:'white'}}>Profile</Text>
              </Animated.View>
          )}
        }}
        />
        <Tabs.Screen 
          name='qrcode' 
          options={{
            headerShown: false,
            tabBarLabel: "QRCode",
          tabBarLabelStyle:{...styles.tabBarLabel},
          headerShown: false,
          tabBarIcon: ({ focused }) => {

            const [ position ] = useState(useSharedValue(focused ?-20: 0))
            const [ color ] = useState(useSharedValue(focused ?"#4C7D9F": "transparent"))

            const animatedStyle = useAnimatedStyle(()=>{
              return{
                transform: [{translateY: position.value}],
                backgroundColor: color.value ,
              }
            },)
            //  si focused est true alors carré devient opacity 1 et translateY 100
            return(

              <Animated.View style={[styles.tabBarIconContainer,animatedStyle]}>
                {focused ?
                    (
                      <Ionicons name="scan-circle-sharp" size={24} color="white" />
                    )
                  :
                    (
                      <Ionicons name="scan-circle-outline" size={24} color="white" />
                    )
                }
                <Text style={{color:'white'}}>QRCode</Text>
              </Animated.View>
          )}
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
  },
  tabBarIconContainer:{
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
})