import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import Animated, { FadeIn, FadeOut, Easing, useSharedValue, withRepeat, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const InfiniteRotate = () => {
    const style = useAnimatedStyle(() => {
        return {
           transform: [
             {
               rotate: withRepeat(
                withSequence(
                    withTiming(0 + 'deg', { duration: -1, easing: Easing.linear }), 
                    withTiming(360 + 'deg', { duration: 1000, easing: Easing.linear })
                  ),
        false,
               ),
            },
           ],
         };
       });
  return (
    <Animated.View style={ style} entering={FadeIn.duration(300).delay(150)} exiting={FadeOut.duration(300)} >
      <AntDesign name="loading2" size={36} color="blue" style={{backgroundColor:"gray"}}/>
    </Animated.View>
  )
}

export default InfiniteRotate
