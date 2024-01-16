import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState, useEffect, useMemo} from 'react'
import Avatar from './Profile/Avatar'
import { SearchBar } from 'react-native-screens'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import FilterPosts from './FilterPosts';
import { Redirect, useSegments, Link } from 'expo-router';
import { useAuth } from '../app/context/AuthContext';

const Header = () => {

    const { user } = useAuth();
    const rootSegment = useSegments()[0];
    const [isHome, setIsHome] = useState(false);


    useEffect(()=>{
        if(rootSegment === '/(tabs)/home/index'){
            setIsHome(true);
        }else{
            setIsHome(false);
        }
    },[rootSegment])

    const [ input, setInput ] = useState();

    const handlePressTchat=()=>{
        <Redirect to='../app/conversation/index'/>
    }

  return (
    <SafeAreaView style={styles.container}>
        <Avatar item={ user }/>
        <View style={styles.searchBarContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.searchBarIcon}/>
            <TextInput 
                placeholder='Search' 
                style={styles.searchBarInput}
                value={input}
                onChangeText={(value)=>setInput(value)}
            />
        </View>
        {/* si Home alors afficher sinon agrandir SearchBar */}
        {isHome && <FilterPosts />}
        <Link href="/(conv)">
            <AntDesign name="message1" size={24} color="black"/>
        </Link>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#ddd',
        shadowOpacity: 0.5,
        shadowColor: '#ddd',
        paddingHorizontal: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    searchBarContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 1,
        marginHorizontal: 10
    },
    searchBarIcon:{
        marginRight: 10
    },
    searchBarInput:{
        flex: 1
    },
    filterPosts:{
        marginRight: 10
    },
    message:{
        marginRight: 10
    },
    messageIcon:{

    }
})