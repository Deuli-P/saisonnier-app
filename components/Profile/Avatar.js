import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation, Link } from 'expo-router';
import MediaImport from '../Media/MediaImport';
import { FontAwesome } from '@expo/vector-icons';

const Avatar = ({item, url, setDataImage, accountType}) => {
    
    // accountType = user or entreprise
    // item = user.image ou entreprise.image
    // url = api url pour envoyer l'image
        // si accountType = user alors url = http://localhost:8002/user/profile/image/:{userId}
        // si accountType = entreprise alors url = http://localhost:8002/entreprise/profile/image/:{userId}
    // setDataImage = fonction pour mettre a jour l'image dans le state

    const image = item ? item : null;

    // handle modification picture
        // ouvre une modal pour choisir entre prendre une photo ou choisir une photo
        // envoie l'image a l'api
        // set l'image dans le state
    const handleChangePicture=()=>{ 
        console.log('change picture')
        setModalOpen(true);

        setDataImage(addImage)
        if(accountType === "user"){
            setUser(addImage)
        }
        else if(accountType === "entreprise"){
            setEntreprise(addImage)
        }
    }

    const addImage = (prev)=>{
        prev , {image: newData}
    }


    const [ modalOpen , setModalOpen ] = useState(false);

    return (
        <View 
          style={styles.container}
        >
          <Image
            source={
              image
              ? { uri: image}
              : require("../../assets/logo.png")
            }
            style={styles.profileImage}
            />
          <Pressable
            style={styles.pressableContainer}
            onPress={()=>handleChangePicture()}
            >
            <FontAwesome name="picture-o" size={18} color="black" />
          </Pressable>
            <MediaImport setmodalOpen={setModalOpen} modalOpen={modalOpen} accountType={accountType}/>
          </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
    profileImage:{
        width: 150,
        height: 150,
        borderRadius: 25,
    },
    pressableContainer:{
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: "#ff9d2f",
        padding: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
        borderColor:"#db6612",
         borderLeftWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
      },
    container:{
        position: "relative",
    }
})
