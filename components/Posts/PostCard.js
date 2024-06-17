import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import DatePost from './DatePost';
import Avatar from '../Profile/Avatar';


const PostCard = ({item, user}) => {


    const firstname = item.firstname;
    const lastname = item.lastname;
    const userImage = item.userImage;
    const dataCreateAt = item.createAt;


    const [showMore, setShowMore] = useState(false);
    const [commentaire, setCommentaire] = useState('');

    // Si cateogorie est offre d'emploi alors possible de postuler dans la section pressableContainer( ajout d'un bouton)
    const handlePost = () => {
        // navigation vers la post page avec les informations du post
        console.log('handlePost',item._id)
    }

    const handleLike=( )=>{
        // like le post
        console.log('Like du post de:',firstname)
    }
    const handleComment=( )=>{
        // commenter le post
        console.log('Comment')
    }
    const handleShare=( )=>{
        // partager le post
        console.log('Partage')
    }

    const handleShowMore=( )=>{
        // afficher plus de commentaires
        console.log('Afficher plus de commentaires')
        setShowMore(!showMore)
    }

    const handlSubmitComment=( )=>{
        // envoyer le commentaire
        console.log('Envoyer le commentaire')
        setCommentaire('')
    }

  return (
    <View style={styles.postContainer}>
        <View style={styles.card}>
            <View style={{flexDirection: "row", width:" 100%", height: 20,marginTop:10, justifyContent: 'space-between'}}>
                <View style={styles.userInformation}>
                    <Image 
                        style={styles.avatarPoster}
                        source={{
                            uri: userImage ? userImage : 'https://reactnative.dev/img/tiny_logo.png'}} 
                            />
                    <Text
                        onPress={handlePost}
                        style={styles.namePoster}
                        > 
                    par {firstname} {lastname}
                    </Text>
                </View>
                    <DatePost date={dataCreateAt} styles={styles}/>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.content}> Ici le contenu du post 
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Atque temporibus ut aliquid alias porro maxime nesciunt aspernatur,
                    eveniet quod. Nostrum officiis optio ipsam ut suscipit rem magnam nihil molestiae alias.
                </Text>
            </View>
            {/*  Ici section afficher le nombre de like , commentaire( pressable pour afficher les commentaires) et partage */}
            <View style={styles.pressableContainer}>
                <Pressable style={styles.pressable} onPress={handleLike}>
                    {/* ici icon de j'aime */}
                    <Text style={styles.pressableText}>J'aime</Text>
                </Pressable>
                <Pressable style={styles.pressable} onPress={handleComment}>
                    {/* ici icon de commentaire */}
                    <Text style={styles.pressableText}>Commenter</Text>
                </Pressable>
                <Pressable style={styles.pressable} onPress={handleShare}>
                    {/* ici icon de partage */}
                    <Text style={styles.pressableText}>Partager</Text>
                </Pressable>
                {/*  si job offer alors pressable <Postuler> */}
            </View>

        </View>
        <View style={styles.commentContainer}>
            {/* ici les commentaires */}
            <View style={styles.commentaireInputContainer}>
                <Avatar item={user}/>
                <TextInput 
                    style={styles.commentaireInput}
                    placeholder="Commenter le post"
                    value= {commentaire}
                    onChangeText={(text)=>setCommentaire(text)}
                />
                {/* icon envoi du commentaire */}
            </View>
            <View style={styles.commentaireSection}>
                    {showMore ? 
                        <Text style={styles.commentaireSectionText}> Commentaires affichés</Text>
                    :
                    (
                        <Pressable onPress={handleShowMore}>
                            <Text style={styles.commentaireSectionText} onPess={handleShowMore}> 2 commentaires. Afficher plus.. </Text>
                        </Pressable>
                    )
                }
            </View>
        </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    card:{
        minHeight: 90,
        backgroundColor: 'gray',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        padding: 10,
    },
    avatarPoster:{
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    namePoster:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    userInformation:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    contentContainer:{
        marginTop:15,
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
    dateContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dateText:{
        fontSize: 10,
        color: 'black',
        opacity: 0.8,
    },
    commentContainer:{
        backgroundColor: 'lightgray',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        padding: 10,
    },
    postContainer:{
        width: '90%',
        marginTop: 10,
    },
    commentaireInputContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    commentaireInput:{
        width: '70%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey',
        paddingHorizontal: 10,
        
    },
    commentaireInputIcon:{
            
        },
    commentaireSection:{
        marginTop: 10,
    },
    commentaireSectionText:{
        color: "blue",
    },
})