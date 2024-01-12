import { Pressable, StyleSheet, TextInput,  View, Text} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
const index = () => {

    // text input pour le text
    // choix de categorie avec un dropdown
    // bouton pour poster
    // bouton pour annuler
    // bouton pour ajouter un media
    // Bouton pour ajouter un evenement

    const router = useRouter();

    const logout = () => {
      clearAuthToken();
    };
    const clearAuthToken = async () => {
      await AsyncStorage.removeItem("authToken");
      console.log("auth token cleared");
      router.replace("/(authenticate)/login");
    };
    
  return (
    <View >
      <Text >Write your post :</Text>
      {/* Text area pour le message */}
      <View>
        {/* add media */}
        
        {/* add evenement */}
        
        {/* add sondage */}
        
      </View>
      <View>

      {/* post */}

      {/* cancel and return home */}
      
        </View>
      <Pressable onPress={logout} style={{paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "purple", width: 120, marginTop: 50}}>
        <Text>Logout</Text>
      </Pressable>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})