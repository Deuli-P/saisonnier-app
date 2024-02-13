import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import {useState, useEffect, useCallback} from 'react';
import Logout from '../../../components/Buttons/Logout';
import { useAuth } from '../../context/AuthContext';
import InputFake from '../../../components/Input/InputFake-disable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const user = () => {

  const { userId, setUser, user } = useAuth();

  const [ data, setData ] = useState(null);

  useEffect(()=>{
    if(!data){
      if( user ){
        setData(user)
      }
      else{
        AsyncStorage.getItem("authToken").then(async(value) => {
          const token = value;
          const id = jwtDecode(token).userId;
          await axios.get(`http://localhost:8002/user/profile/${id}`)
          .then((res) => {
            setUser(res.data.user);
            setData(res.data.user);
          })
        })
      }
    }
  },[data])

  return (
    <SafeAreaView style={{flex:1, alignItems:"center"}}>
      <Image source={data?.image ? {uri: data?.image} : require('../../../assets/logo.png')} style={{width: 170, height:170, marginTop: 40}}/>
      <View style={{width: "80%", marginVertical:20, gap:15}}>
        <InputFake value={data?.firstname} title="Firstname" />
        <InputFake value={data?.lastname} title="Lastname" />
        <InputFake value={data?.username? user.username: "username"} title="Username" />
      </View>
      <View style={{width: "100%", alignItems: "center"}}>
        <Logout />
      </View>
    </SafeAreaView>
  )
}

export default user

const styles = StyleSheet.create({})