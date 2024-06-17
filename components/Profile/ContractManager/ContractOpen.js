import { StyleSheet, Text, View, Pressable, TextInput, PanResponder } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import SwiperTrash from './SwiperTrash';
import { useAuth } from '../../../app/context/AuthContext';


const ContractOpen = ({onDelete, onAdd}) => {

    const { entreprise } = useAuth()

    const [ newLine, setNewLine ] = useState(false)

    const [ newContrat, setNewContrat ] = useState('')

    const contrats = entreprise.contrats

    const handleSubmitNewContract = () => {
        const newData= newContrat
        console.log('[ADD]');
        onAdd(newData)
        setNewContrat("")
        setNewLine(false)
    }


  return (
    <View style={styles.container}>
    {contrats ? 
        (
            contrats?.map((element,index) => {
                return(
                    <View style={[styles.contractContainerDisabled, {backgroundColor:"#767592"}]} key={index}>
                        <Text style={styles.text}>{element}</Text>
                            <SwiperTrash onDelete={onDelete} numero={element}/>
                    </View>
                )
            })
        )
      :
        null
    }
      {newLine ? 
        (
            <View style={[styles.contractContainerDisabled,{backgroundColor:'#BBBBC0'}]}>
                <TextInput value={newContrat} onChangeText={(text)=>setNewContrat(text)} style={styles.inputText}/>
                <Pressable style={styles.pressable} onPress={()=>handleSubmitNewContract()}>
                    <FontAwesome name="edit" size={24} color="black" />
                </Pressable>
            </View>
        )
        :
        null
    }
      <Pressable style={[styles.pressable,{backgroundColor:"#E37322"}]} onPress={()=>setNewLine(true)}>
        { newLine ? 
                <FontAwesome name="minus" size={24} color="black" /> 
            :
                <FontAwesome name="plus" size={24} color="black" />
        }
      </Pressable>
    </View>
  )
}

export default ContractOpen

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:'auto',
        backgroundColor: "#ECE1E1",
        flexDirection: "column",
        gap: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderRadius: 20,
    },
    contractContainerDisabled:{
        width:"100%",
        height:60,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 25,
        paddingRight:5,
        justifyContent: "space-between",
    },
    text:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#242734"
    },
    pressable:{
        backgroundColor:"#E37322",
        borderLeftColor: "#4C7D9F",
        borderLeftWidth: 2,
        width:50,
        height:50,
        borderRadius: 50,
        justifyContent:"center",
        alignItems:"center",
    },
    inputText:{
        width: "70%",
        height: 40,
        borderBottomColor: "#242734",
        borderBottomWidth: 2,
        color: "#ECE1E1",
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 20,
        color: "#242734",
    }
})