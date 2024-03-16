import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';


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
          name='entreprise' 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {

              const position = useSharedValue(focused ? true: false)




              const animatedStyle = useAnimatedStyle(()=>{
                return{
                  transform:[{translateY: position.value? -20: 0}],
                  backgroundColor: position.value? "#E37322": "transparent"
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
          name='scanner' 
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {

              const [ position ] = useState(useSharedValue(focused ?-20: 0))
              const [ color ] = useState(useSharedValue(focused ?"#E37322": "transparent"))

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
                        <Ionicons name="scan-circle" size={24} color="white" />
                      )
                    :
                      (
                        <Ionicons name="scan-circle-outline" size={24} color="white" />
                      )
                  }
                  <Text style={{color:'white'}}>Scanner</Text>
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