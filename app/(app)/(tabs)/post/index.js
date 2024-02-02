import { Pressable, StyleSheet, TextInput, Image, View, Text, TouchableOpacity, SafeAreaView, Button, Modal} from 'react-native'
import { useEffect, useState } from 'react'
import { useRouter, useNavigation } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import SubmitButton from '../../../../components/Buttons/Submit';
import Close from '../../../../components/Buttons/goBack/Close';

const index = () => {

  const [ modalUp, setModalUp ] = useState(false);
  const [ categorieSelected, setCategorieSelected ] = useState("General");

  const { user } = useAuth();

  const [ textArea, setTextArea ] = useState("");
  const [ categories, setCategories ] = useState("General");
  const [ media, setMedia ] = useState();
  const [ event, setEvent ] = useState();
  const [ sondage, setSondage ] = useState();
  // croix pour fermer, avatar, categorie dopdown,bouton publier
  // text input pour le texte
  // bouton pour ajouter un media, evenement, sondage
  
  // click sur Categorie select , ouvre modal en bas de la page avec les checkbox de categories a selectionné , only one selection
  const router = useRouter();
  const navigation = useNavigation();

  const handleModalEvent = () => {
    navigation.navigate( "modalEvent" )
  }
  const handleModalSondage = () => {
    navigation.navigate( "modalSondage" )
  }
  const handleModalMedia = () => {
    navigation.navigate( "modalMedia" )
  }

  const handlePost = () => {
    console.log('[POST]valider post')
  }

  useEffect(() => {
    console.log("[POST] Post en cours de creation");
  },[])

  return (
    <SafeAreaView >
      <View style={{ flexDirection:"row", height: 70, width: "100%", paddingVertical:20,paddingHorizontal:10, justifyContent: "space-between", alignItems: "center"}}>
        <Close />
        <Pressable style={styles.CategoriesContainer} onPress={()=>{console.log("click modal categories");}}>
          <Image source={{uri: user?.userImage}} style={{width: 50, height: 50, borderRadius: 50}}/>
          <Text style={styles.SelectCategories}>{categorieSelected}</Text>
        </Pressable>
        <SubmitButton title='Post' onPress={()=>console.log("[POST Submit")}/>
      </View>
      <TextInput 
        placeholder='Write your post here' 
        multiline={true} numberOfLines={4} 
        style={styles.inputTextArea}
        value={textArea}
        onChangeText={(textArea) => setTextArea(textArea)}

        // modal demi ouverte et ouvre plus au clique
      />
      <View style={styles.buttonsContainer}>
        {/* add media */}
        <TouchableOpacity style={styles.inputFile} onPress={()=>handleModalMedia()}>
          <FontAwesome name="file-picture-o" size={36} color="black" />
        </TouchableOpacity>
        {/* add evenement */}
        <TouchableOpacity style={styles.inputFile} onPress={()=>handleModalEvent()}>
          <FontAwesome name="calendar" size={36} color="black" />
        </TouchableOpacity>
        {/* add sondage */}
        <TouchableOpacity style={styles.inputFile} onPress={()=>handleModalSondage()}>
          <MaterialCommunityIcons name="google-analytics" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  inputFile:{
    padding: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 50,
    marginHorizontal: 5,
    shadowRadius: 3,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  inputTextArea:{
    backgroundColor: "#E0E0E0",
    borderRadius: 15,
    padding: 15,
    paddingTop:15,
    marginTop: 15,
    marginHorizontal:15,
    height: 300,
    zIndex: -100,
  },
  pressableText:{
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  inputCategories:{
    width: 140,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  buttonsContainer:{
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap:30,
  },
  CategoriesContainer:{
    width: 180,
     flexDirection:"row",
     gap:5,
      alignItems: "center",
      justifyContent:"center",
       position:"relative",
  },
  SelectCategories:{
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E0E0E0",
    borderStyle: "solid",
    borderWidth: 2,
  },
})