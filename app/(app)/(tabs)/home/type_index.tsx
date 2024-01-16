import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PostCard from '../../../../components/Posts/PostCard';
import Avatar from '../../../../components/Profile/Avatar';
import "core-js/stable/atob";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

interface UserProps {
    firstname: String,
    lastname: String,
    email: String,
    description?: String,
    userImage: String,
}

const index = () => {


    const [ userId, setUserId ] = useState<string>();
    const [ user , setUser ] = useState<UserProps>()
    const [ otherUsers, setOtherUsers ] = useState<UserProps[]>();

    useEffect(() => {
    const fetchUser = async () => {
      const token: string = await AsyncStorage.getItem("authToken");
    
      const decodedToken = jwtDecode(token);
      const userId: string = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8002/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
      }, [userId]);

      const fetchUsers = async () => {
        axios
          .get(`http://localhost:8002/users/${userId}`)
          .then((response) => {
            setOtherUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };


    return (
        <SafeAreaProvider>
            <View style={styles.AppBar}>
                <Text>Home Screen</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.TopViewContainer}>
                    <Avatar item={user}/>
                    <View style={styles.SearchBarContainer}>
                        <TextInput style={styles.SearchBarInput} placeholder='SearchBar'/>
                        <Icon name="magnify" type='material-community' size={24} color="black" />
                    </View>
                </View>
                <View>
                    <Text>Catégories des posts:</Text>
                </View>
                <View>
                    <Text>Filtres:</Text>
                </View>
                <View style={styles.postsListContainer}>

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