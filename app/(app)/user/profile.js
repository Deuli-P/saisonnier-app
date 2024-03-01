import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native'
import {useState, useEffect, useCallback} from 'react';
import Logout from '../../../components/Buttons/Logout';
import { useAuth } from '../../context/AuthContext';
import InputFake from '../../../components/Input/InputFake-disable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { set } from 'react-hook-form';


const user = () => {

  const { userId, setUser, user, logout} = useAuth();

  const [ data, setData ] = useState(null);

  const [ username, setUsername ] = useState( user?.username ? user.username : " " );
  const [ usernameInputDisabled, setUsernameInputDisabled ] = useState(true);
  const [ errorUsername, setErrorUsername ] = useState(false);

  const regexUsername = /^[a-zA-Z0-9_]{3,30}$/;

  useEffect(()=>{
    console.log('user:',user);
  },[user])

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

  const handleUsernameSubmit = async()=> {
    console.log('[USERNAME]submit')
    console.log('user.username:',user.username);
    const newUsername = username.trim();
    if(newUsername === user.username){
      setUsernameInputDisabled(true);
      return;
    }
    else{
        try{
        await axios.post(`http://localhost:8002/user/profile/username/${userId}`, {username:newUsername})
        .then((res)=>{
          console.log("[USERNAME]Update Username Done:",res.status)
          setUser(newUsername)
        })
      }
      catch(err){
        setErrorUsername(true);
        setUsername(user.username);
        setTimeout(()=>{
          setErrorUsername(false);
        }, 2000)
        console.log("[USERNAME] Error post new username:",err)
      }
    }
    setUsernameInputDisabled(true);
  }

  const handleOpenUpdateUsername = () => {
    setUsernameInputDisabled(false);
  }

  const handleOpenMediaModal = () => {
    console.log('open media modal')
  }

  return (
    <SafeAreaView style={{flex:1, alignItems:"center",backgroundColor: "#242734"}}>
      <View style={{width: 186, height:186, marginTop: 40,position:"relative"}}>
        <Image source={data?.image ? {uri: data?.image} : require('../../../assets/logo.png')} style={{width:"100%",height:"100%", borderRadius:30}}/>
        <Pressable style={[styles.usernameIconPressable,{position: "absolute",bottom:-10, right:5}]} onPress={()=>handleOpenMediaModal()}>
          <FontAwesome name="pencil" size={24} color="#191818" />
        </Pressable>
      </View>
      <View style={{width: "80%", marginVertical:20, gap:15}}>
        <InputFake value={data?.firstname} title="Firstname" />
        <InputFake value={data?.lastname} title="Lastname" />
        <View style={styles.usernameContainer} >
          <View style={{width:"90%",alignItems:"flex-start", position:"relative",gap:3}}>
            <Text style={{fontSize:18, color:"#ECE1E1"}}>Username:</Text>
          <TextInput 
            style={[styles.usernameInput,{backgroundColor: usernameInputDisabled? '#767592' : "#BBBBC0", borderRadius:5}]} 
            value={username} 
            onChangeText={(text)=>setUsername(text)}
            editable={usernameInputDisabled? false : true}
            />
            { errorUsername?<Text style={{color:"red", position:"absolute", bottom:-20}}>Error envoi username</Text> :null}
            </View>
          { usernameInputDisabled ?
            (
              <Pressable style={styles.usernameIconPressable} onPress={()=>handleOpenUpdateUsername()}>
                <FontAwesome name="pencil" size={24} color="#191818" />
              </Pressable>
            )
          : 
            (
              <Pressable style={styles.usernameIconPressable} onPress={()=>handleUsernameSubmit()}>
                <FontAwesome name="check" size={24} color="#191818" />
              </Pressable>
            )
          }
        </View>
      </View>
      <View style={{width: "100%", alignItems: "center"}}>
        <Pressable onPress={()=> logout()} style={[styles.submitButton,{ backgroundColor:"#4C7D9F", borderLeftColor:'#E37322'}]}>
          <Text style={styles.submitButtonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default user

const styles = StyleSheet.create({
  usernameContainer:{
    width:"90%",
    flexDirection: "row",
    alignItems: "center",
    gap:20
  },
  usernameIconPressable:{
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#4C7D9F",
    borderColor: "#E37322",
    borderLeftWidth: 2,
    marginTop:22
  },
  usernameInput:{
    width: "100%",
    padding: 10,
  },
  submitButton: {
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    gap: 15,
    borderLeftWidth: 3,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
})