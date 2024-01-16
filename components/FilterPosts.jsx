import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const FilterPosts = () => {

    // si clique alors ouvre modal pour choisir le filtrage des posts sur le home
  return (
    <>
      <Ionicons name="filter" size={24} color="black" />
    </>
  )
}

export default FilterPosts

const styles = StyleSheet.create({})