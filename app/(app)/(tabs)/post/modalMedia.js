import { Alert, Button, Image, Pressable, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import Cancel from '../../../../components/Buttons/goBack/Cancel';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { usePost } from "../../../context/PostContext";
import MediaImport from '../../../../components/Media/MediaImport';
import SubmitButton from '../../../../components/Buttons/Submit';
const modalMedia = () => {

  const { setMedia , media } = usePost();

  const navigation = useNavigation();

// component commun pour annuler et retourner en arrière.
  const handleCancel = () => {
    setMedia("")
    navigation.goBack();
  }

  const handleSuivant = () => {
    navigation.navigate("index");
  }
  

  
  useEffect(() => {
    console.log("[MEDIA] Modal Media ouverte");
  }, [])
  // a l'ouverture reset tout les champs


  const handleWarning = () => {
    Alert.alert("[MEDIA] Features en cours de developpement");
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Cancel />
          <SubmitButton title='Suivant' onPress={()=>console.log("[MEDIA] Import image vers Post")}/>
      </View>
      <View style={styles.imagePickerContainer}>
      {media ?
       <Image source={{ uri: item.uri }} style={styles.imagePickerImage} key={index}/>
      :
        <MediaImport type="post" />
      }
      </View>
      <View style={styles.optionsFiltersContainer}>
        {/* edit */}
        <Pressable style={styles.optionsFilters} onPress={()=>handleWarning()}>
          <Ionicons name="pencil" size={24} color="black" />
        </Pressable>
        {/* resize */}
        <Pressable style={styles.optionsFilters} onPress={()=>handleWarning()}>
          <MaterialCommunityIcons name="text-recognition" size={24} color="black" />
        </Pressable>
        {/* legend */}
        <Pressable style={styles.optionsFilters} onPress={()=>handleWarning()}>
          <Text>Alt</Text>
        </Pressable>
        {/* identifie */}
        <Pressable style={styles.optionsFilters} onPress={()=>handleWarning()}>
          <Ionicons name="person" size={24} color="black" />
        </Pressable>
        {/* sticker */}
        <Pressable style={styles.optionsFilters} onPress={()=>handleWarning()}>
          <MaterialCommunityIcons name="sticker-circle-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

export default modalMedia

const styles = StyleSheet.create({
  optionsFilters:{
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
  optionsFiltersContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: 'gray',
    width: 250,
    marginBottom: 40,
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 30,
  },
  navigationContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  suivantPressable:{
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFB800',
    borderRadius: 20,
    marginRight: 20,
  },
  suivantText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  imagePickerContainer:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerButton:{
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFB800',
    borderRadius: 20,
    marginVertical: 10,
    color: 'white',
    fontSize: 20,
  },
  imagePickerButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  imagePickerAltContainer:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFB800',
    borderRadius: 20,
  },
  imagePickerAltText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  imagePickerImage:{
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
})