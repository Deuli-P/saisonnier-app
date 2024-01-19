import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import Cancel from '../../../../components/Buttons/goBack/Cancel';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const modalMedia = () => {

  const navigation = useNavigation();

// component commun pour annuler et retourner en arrière.
  const handleCancel = () => {
    navigation.goBack();
  }

  const [ imageImport, setImageImport ] = React.useState([]);

  useEffect(() => {
    console.log("[MEDIA] Modal Media ouverte");
    const handleMedia = async () => {
      try{
        await launchImageLibrary({mediaType: 'photo',
                             selectionLimit: 4,
                             includeBase64: true
                          })
            .then((response) => {
              console.log(response);
              setImageImport(response.assets);
            })
            .catch((error) => {
              if(error.didCancel){
                console.log("[MEDIA] CAncel:",error.didCancel);
              }
              if(error.errorCode === 'camera_unavailable'){
                console.log("[MEDIA] Camera unavailable:",error.errorCode);
              }
              if(error.errorCode === 'permission'){
                console.log("[MEDIA] Permission:",error.errorCode);
              }
              if(error.errorCode === 'others'){
                console.log("[MEDIA] Others:",error.errorCode);
              }
              if( error.errorMessage){
                console.log("[MEDIA] errorMessage:",error.errorMessage);
              }
            });
      }
      catch(e){
        console.log(e);
      }
    }
    handleMedia();
  }, [])
  // a l'ouverture reset tout les champs

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Cancel />
        <Pressable style={styles.suivantPressable}>
          <Text style={styles.suivantText}>Suivant</Text>
        </Pressable>
      </View>
      <View>
        <Image source={{uri: "https://picsum.photos/200/300"}} style={styles.image}/>
      </View>
      <View style={styles.optionsFiltersContainer}>
        {/* edit */}
        <Pressable style={styles.optionsFilters}>
          <Ionicons name="pencil" size={24} color="black" />
        </Pressable>
        {/* resize */}
        <Pressable style={styles.optionsFilters}>
          <MaterialCommunityIcons name="text-recognition" size={24} color="black" />
        </Pressable>
        {/* legend */}
        <Pressable style={styles.optionsFilters}>
          <Text>Alt</Text>
        </Pressable>
        {/* identifie */}
        <Pressable style={styles.optionsFilters}>
          <Ionicons name="person" size={24} color="black" />
        </Pressable>
        {/* sticker */}
        <Pressable style={styles.optionsFilters}>
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
  }
})