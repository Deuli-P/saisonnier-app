import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import PostCard from '../../../../components/Posts/PostCard';
import "core-js/stable/atob";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../../components/Header';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useSegments } from 'expo-router';

const index = () => {

    const rootSegments = useSegments()[2];

    const { user , userId, setUser } = useAuth();

    useEffect(() => {
        console.log("[HOME] rootSegment:",rootSegments);
        const fetchProfile = async() => {
            try{
                await axios.get(`http://localhost:8002/profile/${userId}`)
                .then((res) => {
                    console.log("[HOME] fetch profile:",res.data);
                    setUser(res.data);
                })
            }
            catch(err){
                console.log("[HOME] error fetchProfile",err);
            }
        }
        console.log("[HOME] userId:",userId);
        if(user === null){
            fetchProfile();
            console.log("[HOME] fetch profile done:");
        }
    }, [userId, user])

    return (
        <SafeAreaProvider>
            <Header/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>Catégories des posts:</Text>
                </View>
                <View style={styles.postsListContainer}>
                  <Text>{user ? user.firstname: "vide"}</Text>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
};

export default index;

const styles = StyleSheet.create({
    AppBar:{
        backgroundColor: '#fff',
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#ddd',
        shadowOpacity: 0.5,
        shadowColor: '#ddd',
        shadowOffset: { width: 0, height: 5 },
    },
    TopViewContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    avatarUser:{
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#ddd',
    },
    SearchBarContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 40,
        gap: 5,
        paddingHorizontal: 15,
    },
    SearchBarInput:{
        width: 200,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postsListContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        width: '100%',
        paddingHorizontal: 10,
        height: 500,
    },
});