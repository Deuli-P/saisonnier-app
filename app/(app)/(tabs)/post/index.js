import { Pressable, StyleSheet, TextInput,  View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const index = () => {



    // text input pour le text
    // choix de categorie avec un dropdown
    // bouton pour poster
    // bouton pour annuler
    // bouton pour ajouter un media
    // Bouton pour ajouter un evenement

    const router = useRouter();
    const navigation = useNavigation();

    const handleModalEvent = () => {
      navigation.navigate("modalEvent")
    }
    const handleModalSondage = () => {
      navigation.navigate("modalSondage")
    }
    const handleModalMedia = () => {
      navigation.navigate("modalMedia")
    }
    


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
      <TextInput placeholder='Write your post here' multiline={true} numberOfLines={4} style={styles.inputTextArea}/>
      <View style={styles.buttonsContainer}>
        {/* add media */}
        <TouchableOpacity style={styles.inputFile} onPress={()=>handleModalMedia}>
          <FontAwesome name="file-picture-o" size={24} color="black" />
        </TouchableOpacity>
        {/* add evenement */}
        <TouchableOpacity style={styles.inputFile} onPress={()=>handleModalEvent()}>
          <FontAwesome name="calendar" size={24} color="black" />
        </TouchableOpacity>
        {/* add sondage */}
        <TouchableOpacity style={styles.inputFile} onPress={()=>handleModalSondage()}>
          <MaterialCommunityIcons name="google-analytics" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.pressableContainer}>
      {/* post */}
        <TouchableOpacity style={styles.pressablePost}>
          <Text style={styles.pressableText}>Post</Text>
        </TouchableOpacity>
      {/* cancel and return home */}
        <TouchableOpacity style={styles.pressableCancel}>
          <Text style={styles.pressableText}>Cancel</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable onPress={logout} style={{paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "purple", width: 120, marginTop: 50}}>
            <Text style={styles.pressableText}>Logout</Text>
          </Pressable>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  inputFile:{
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonsContainer:{
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  inputTextArea:{
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginHorizontal:5,
    height: 150,
  },
  pressableContainer:{
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
  },
  pressablePost:{
    backgroundColor: "green",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 170,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableCancel:{
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 170,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableText:{
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  }

})