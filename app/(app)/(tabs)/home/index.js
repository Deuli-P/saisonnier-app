import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import PostCard from '../../../../components/Posts/PostCard';
import "core-js/stable/atob";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../../components/Header';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useSegments } from 'expo-router';

const index = () => {

    const rootSegments = useSegments()[2];

    const [ isLoading, setIsLoading ] = useState(true);

    const { user , userId, setUser } = useAuth();

    useEffect(() => {
        if (user != undefined) {
            setIsLoading(false);
        }
    }, [user]);

    if (!user) {
        return <Text>Loading...</Text>;
      }

    return (
                <SafeAreaView>
                    <Header/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text>Catégories des posts:</Text>
                        </View>
                        <View style={styles.postsListContainer}>
                            <Text>Prenom: {user?.firstname}</Text>
                            <Text>Nom: {user?.lastname}</Text>
                            <Text>email: {user?.email}</Text>
                            <Text>verified: {user?.verified}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
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