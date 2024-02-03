import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, Link } from 'expo-router';
import MediaImport from '../Media/MediaImport';

const Avatar = ({item, dimensionPicture}) => {
    

    return (
        <Pressable 
        style={styles.container}
        onPress={()=>MediaImport()}
        >
    <Image 
        source={{
            uri: item?.image ? item.image :
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
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#ddd',
    }
})
