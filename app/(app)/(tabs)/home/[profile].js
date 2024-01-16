import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';


const profile = () => {

  // Afficher les informations de l'utilisateur dans une section 
  //     ( nom, prenom, description, image de profil, adresse( ville), emploi, nbrs d'amis)
  // button modifier les informations (ouvre une autre page avec formulaire)( username, description, image de profil, adresse)
  // Bouton pour envoyer un message si ce n'est pas le profil de l'user ( component button message)
  // Afficher ses posts les plus recents de l'utilisateur ( PostCard)
  // Afficher les experiences de l'utilisateurs ( section )
  // Afficher les formations suivi ( section )
  // Aficher les centres d'intérets ( section ).

const fetchUserProfile = async () => {
  try{
      const response = await axios.get(`http://localhost:8002/profile/${userId}`);
      const userData = response.data.user;
      setUser(userData);
  }
  catch(err){
      console.log("[HOME] Error fetch le profile du user:", err);
  }
}

  return (
    <View>
      <Text>Profile page de </Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})
