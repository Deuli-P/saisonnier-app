import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import PostCard from '../../../components/Posts/PostCard';
import Avatar from '../../../components/Profile/Avatar';
import "core-js/stable/atob";

const index = () => {

    const [userId, setUserId] = React.useState("");
    const [user, setUser] = React.useState();
    const [otherUsers, setOtherUsers] = React.useState([]);

    
    React.useEffect(() => {
        const fetchUser = async () => {
            console.log("[HOME] /////////////////");
            const token = await AsyncStorage.getItem("authToken");
            console.log("[HOME] token:", token);
            const decoded = jwtDecode(token);
            const userId = decoded.userId;
            console.log("[HOME] userId:", userId);
            setUserId(userId);
            console.log("[HOME] /////////////////");
        }
        fetchUser();
    }, []);

    React.useEffect(() => {
        if(userId){
            fetchUserProfile()
        }
    }, [userId]);
    
    const fetchUserProfile = async () => {
        try{
            const response = await axios.get(`http://localhost:8002/profile/${userId}`);
            const userData = response.data.user;
            setUser(userData);
            console.log("[HOME] user:", user);
        }
        catch(err){
            console.log("[HOME] Error fetch le profile du user:", err);
        }
    }
    React.useEffect(() => {
        if(userId){
            fetchOtherUsers()
        }
    }, [userId]);

    const fetchOtherUsers = async () => {
        try{
            const response = await axios.get(`http://localhost:8002/users/${userId}`)
            .then((response)=> { setOtherUsers(response.data.user) })
        }
        catch(err){
            console.log("[HOME] Error fetch les autres users:", err);
        }
    };


    return (
        <SafeAreaView>
            <View style={styles.AppBar}>
                <Text>Home Screen</Text>
            </View>
            <View style={styles.TopViewContainer}>
                <Avatar item={user}/>
                <View style={styles.SearchBarContainer}>
                    <TextInput style={styles.SearchBarInput} placeholder='SearchBar'/>
                    <AntDesign name="search1" size={24} color="black" />
                </View>
            </View>
            <View>
                <Text>Catégories des posts:</Text>
                <Text>{user ? user.firstname : "Pas de donnée utilisateur"}</Text>
                <Text>{otherUsers.length < 0 ? `nombre d'autre: ${otherUsers.length}` : "Pas de donnée sur les autres utilisateurs"}</Text>
            </View>
            <View>
                <Text>Filtres:</Text>
            </View>
            <View>
                <FlatList 
                    data={otherUsers}
                    keyExtractor={(item) => item._id}
                    renderItem={({item,key}) => (
                        <PostCard item={item} key={`postCard_${item._id}`}/>
                    )}
                    />
            </View>
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
    }
});