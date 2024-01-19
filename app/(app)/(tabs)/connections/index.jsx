import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/AuthContext';

const index = () => {

  const { logout, user } = useAuth();

  return (
    <View>
      <Text>Connections pages</Text>
      <View style={styles.pressableContainer}>
          <Pressable onPress={logout} style={{paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "purple", marginTop: 40, justifyContent:"center"}}>
            <Text style={styles.pressableText}>Logout</Text>
          </Pressable>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  pressableText:{
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})