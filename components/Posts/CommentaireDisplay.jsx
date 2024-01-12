import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from '../Profile/Avatar'
import DatePost from './DatePost'

const CommentaireDisplay = () => {
  return (
    <View style={styles.container}>
        <Avatar />
        <View>
            <View>
                <View>
                    <View>
                        <Text>nom prenom de l'utilisateur qui a commenté</Text>
                        <Text>emploi et employeur</Text>
                    </View>
                    <DatePost date={"createAt"}/>
                </View>
            <Text>CommentaireDisplay</Text>
            </View>
            <View>
                <View>
                    <Text>Like</Text>
                    <Text>.</Text>
                    <Text>1</Text>
                </View>
                <View>
                    <Text>Répondre</Text>
                    <Text>.</Text>
                    <Text>1 commentaire</Text>
                </View>
            </View>
        </View>
    </View>
  )
}


export default CommentaireDisplay

const styles = StyleSheet.create({

})