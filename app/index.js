import { Redirect, Slot } from 'expo-router';
import { useEffect, useState } from 'react'
import { UserProvider } from './context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const index = () => {

  const [ connect, setConnect ] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("authToken").then((value)=>{
      if (value === null) {
        setConnect(false);
      }
      else {
        setConnect(true);
      }
    })
  },[])

  if(!connect){
    return (
      <UserProvider >
        <Redirect href="/(authenticate)/login"/>
      </UserProvider>
    )
  }


  return (

        <UserProvider >
            <Slot/>
        </UserProvider>

  )
}

export default index

// index.js => /