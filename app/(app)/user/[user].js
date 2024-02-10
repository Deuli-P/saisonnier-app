import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import Logout from '../../../components/Buttons/Logout';
import { useAuth } from '../../context/AuthContext';
import InputFake from '../../../components/Input/InputFake-disable';

const user = () => {

  const { user, userId } = useAuth();
  return (
    <SafeAreaView style={{flex:1, alignItems:"center"}}>
      <Image source={user?.image ? {uri: user?.image} : require('../../../assets/logo.png')} style={{width: 170, height:170, marginTop: 40}}/>
      <View style={{width: "80%", marginVertical:20, gap:15}}>
        <InputFake value={user?.firstname} title="Firstname" />
        <InputFake value={user?.lastname} title="Lastname" />
        <InputFake value={user?.username? user.username: "username"} title="Username" />
      </View>
      <View style={{width: "100%", alignItems: "center"}}>
        <Logout />
      </View>
    </SafeAreaView>
  )
}

export default user

const styles = StyleSheet.create({})