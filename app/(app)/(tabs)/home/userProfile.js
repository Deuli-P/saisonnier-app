import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from "../../../context/AuthContext";

const userProfile = () => {


  const { user }  = useAuth();
  // Afficher les informations de l'utilisateur dans une section 
  //     ( nom, prenom, description, image de profil, adresse( ville), emploi, nbrs d'amis)
  // button modifier les informations (ouvre une autre page avec formulaire)( username, description, image de profil, adresse)
  // Bouton pour envoyer un message si ce n'est pas le profil de l'user ( component button message)
  // Afficher ses posts les plus recents de l'utilisateur ( PostCard)
  // Afficher les experiences de l'utilisateurs ( section )
  // Afficher les formations suivi ( section )
  // Aficher les centres d'intérets ( section ).

  const converstDate = (date) => {
    const newDate = user.createAt;
    return newDate.toLocaleDateString();
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Your Profile </Text>
        <View style={{borderRadius:50, width: 100, height: 100}}>
          <Image source={{uri: user?.userImage}} style={{width: "100%", height: "100%", objectMode: "contain"}}/>
        </View>
        <Text>{user?.firstname} {user.lastname}</Text>
        <Text>{user?.age}; {user?.address}</Text>
        <Text>Active since - {converstDate}</Text>
      </View>
      <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:10,}}>
        <Text> Personnal Info</Text>
        <Pressable>
          <Text>Edit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default userProfile

const styles = StyleSheet.create({})
