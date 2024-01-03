import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PostCard = ({item}) => {


    const handlePost = () => {
        // naviggation vers la post page avec les informations du post
        console.log('handlePost')
    }
  return (
    <View>
      <Text>PostCard</Text>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    card:{
        width: '90%',
        height: "auto",
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    avatarPoster:{
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    namePoster:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    contentContainer:{
        marginTop:10,
        width: '100%',
    },
    content:{
        fontSize: 15,
    },
    image:{
        width: '100%',
        height: 200,
        marginTop: 10,
    },
    pressableContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    pressable:{
        color:"black",

    },
    pressableText:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    pressableIcon:{
        width: 5,
        height: 5,
    },
})