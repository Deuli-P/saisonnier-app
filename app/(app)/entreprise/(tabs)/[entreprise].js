import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import Logout from '../../../../components/Buttons/Logout'

const entreprise = () => {
  const { entreprise } = useAuth()


  return (
    <SafeAreaView>
      <Text>{entreprise? entreprise.name : "Nom de l'entreprise"}</Text>
      
      <Text> Ici profile avec modification horaire et image</Text>
      <Logout/>
    </SafeAreaView>
  )
}

export default entreprise

const styles = StyleSheet.create({})