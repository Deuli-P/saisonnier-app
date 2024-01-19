import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import { Entypo } from '@expo/vector-icons';
const SelectCategories = () => {

    const [selected, setSelected] = React.useState("General");


    const data = [
        {key: 1, value: 'General'},
        {key: 2, value: 'Job Offer'},
        {key: 3, value: 'Promotion'},
        {key: 4, value: 'Activity'},
        {key: 5, value: 'Party'},
        {key: 6, value: 'Events'},
        {key: 7, value: 'News'},
        {key: 8, value: 'Questions'},
        {key: 9, value: 'Others'},
      ];
  return (
    <SelectList
      setSelected={(val)=> setSelected(val)}
      data={data}
      save="value"
      renderDropdownIcon={isOpened => {
        return <Entypo name={isOpened ? 'chevron-up' : 'chevron-down'} color='#444' size={20} />;
      }}
      search={false} 
      placeholder={selected}
      boxStyles={styles.boxStyles} 
      inputStyles={styles.boxStylesText}
      defaultOption={selected}  
      dropdownStyles={styles.dropdownStyles}
      dropdownTextStyles={styles.dropdownText}
    />
  )
}

export default SelectCategories

const styles = StyleSheet.create({
    boxStyles:{
        borderWidth: 2,
        borderRadius: 10,
        padding: 2,
        marginTop: 10,
        marginBottom: -8,
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 30,
        width: 120,
        height: 50,
        position: 'relative',
    },
    boxStylesText:{
    },
    dropdownStyles:{
        alignItems: 'center',
        height: 300,
        zIndex: 1000,
        padding:5,
        backgroundColor: '#fff',
        position: 'absolute',
        top:50,
        width: 120,

    },
    dropdownText:{
    },
    chevron:{

    }
})