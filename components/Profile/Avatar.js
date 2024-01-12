import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';

const Avatar = ({item}) => {
    
    const navigation = useNavigation();


    const handleProfile= () => {
        try{
            console.log("[AVATAR] User info:", item);
            navigation.navigate("profile", {item: item})
        }
        catch(err){
            console.log(`[AVATAR] Impossible d'aller sur la page profile de ${item.lastname}:`, err);
        }
    }
  return (
    <Pressable 
        style={styles.container}
        onPress={handleProfile}
    >
    <Image 
        source={{
            uri: item?.userImage ? item.userImage :
                'https://reactnative.dev/img/tiny_logo.png',
            
        }} 
      style={styles.image}/>
    </Pressable>
  )
}

export default Avatar

const styles = StyleSheet.create({
    image:{
        width: "100%",
        height: "100%",
        objectFit: 'cover',
        borderRadius: 50,
    },
    container:{
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#ddd',
    }
})
