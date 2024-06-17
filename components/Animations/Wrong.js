import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
const Wrong = () => {
  return (
    <View>
        <MaterialIcons name="error" size={36} color="red" />
    </View>
  )
}

export default Wrong

const styles = StyleSheet.create({})