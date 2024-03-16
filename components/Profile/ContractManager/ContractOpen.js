import { StyleSheet, Text, View, Pressable, TextInput, PanResponder } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import SwiperTrash from './SwiperTrash';


const ContractOpen = ({data, setData}) => {

    const [ newLine, setNewLine ] = useState(false)

    const nextIndex = data.length

    const [ newContract, setNewContract ] = useState({id:nextIndex, name:'test'})

    const handleAdd = () => {
        setNewLine(!newLine)
        if(newLine){
            console.log('annuler');
        }
        else{
            console.log('ajouter');
        }
        // lorsque l'utilisateur appuie sur le bouton +,
            // DONE une nouvelle ligne apparait avec un input pour ajouter un nouveau contrat
            // l'utilisateur peut ajouter autant de contrat qu'il le souhaite
            // DONE le boutn + devient - pour annuler
        // valide en appyant sur le bouton "edit"
            // le nouveau contrat est ajouté a la liste déjà existante dans l'app
            // envoyé a l'api
        //
    }

    const handleSubmitNewContract = () => {
        const newData= [...data];

        setNewLine(false)
        newData.push(newContract)
        setData(newData)
        setNewContract({id:'', name:""})
        // envoie le nouveau contrat a l'api
    }


    const handleDeleteItem = (index) => {
        // const updatedData = data.filter((item) => {
        //     console.log(`[TASH] delete: ${item.id}  !== ${element.id}`)
        //     item.id !== element.id});
        const newData = [...data];

        // Supprimez l'élément à l'index spécifié
        newData.splice(index, 1);

        // Mettez à jour l'état avec le nouveau tableau
        setData(newData);
        // setData(updatedData);
      };


  return (
    <View style={styles.container}>
    {data ? 
        (
            data.map((element,index) => {
                return(
                    <View style={[styles.contractContainerDisabled, {backgroundColor:"#767592"}]} key={index}>
                        <Text style={styles.text}>{element.name}</Text>

                            <SwiperTrash data={data} setData={setData} index={index}/>
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
                <TextInput value={newContract} onChangeText={(text)=>setNewContract({id: nextIndex, name: text})} style={styles.inputText}/>
                <Pressable style={styles.pressable} onPress={()=>handleSubmitNewContract()}>
                    <FontAwesome name="edit" size={24} color="black" />
                </Pressable>
            </View>
        )
        :
        null
    }
      <Pressable style={[styles.pressable,{backgroundColor:"#E37322"}]} onPress={()=>handleAdd()}>
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