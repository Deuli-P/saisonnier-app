import { StyleSheet, Text, View,Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, ReduceMotion, Easing } from "react-native-reanimated";
import ContractClose from './ContractClose';
import ContractOpen from './ContractOpen';
import { useAuth } from '../../../app/context/AuthContext';


const ContractManager = () => {

    const { userId, entreprise, setEntreprise } = useAuth()

    const [ childrenTest, setChildrenTest ] = useState(
        [
            "EEOFFIRFJ33044",
            "ZRF99DK3°33",
            "DOEFJZEFZEOFK",
            "ODFPZEFZEF2"
        ])

    const [ contractNumberArrayOpen, setContractNumberArrayOpen] = useState(true)
    
    const rotateChevron = useSharedValue(contractNumberArrayOpen? "180deg": "0deg")

    const handleOpenContractArray = () => {
        setContractNumberArrayOpen(!contractNumberArrayOpen)
    }



    const onDelete = async (numero)=> {
        const sending = await fetch(`http://localhost:8002/entreprise/contrat/${userId}/${numero}`,{
            method:"DELETE"
        })

        const response = await sending.json()
        if(response.ok){
            console.log("Supression confirmé");
        }
        else{
            console.log("Suppression non valide");
        }
  }

  const onAdd=async(numero)=> {
        // envoie le nouveau contrat a l'api
        await fetch(`http://localhost:8002/entreprise/contrat/${userId}/${numero}`,{
        method:"POST"})
        .then((res)=> res.json())
        .then((response)=> console.log(response))
  }

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ 
          rotate: withTiming(
            rotateChevron.value)
        }],
      }));
    

    

    return (
        <View style={styles.container}>
           { !contractNumberArrayOpen ?
                    <ContractClose data={entreprise.contrats}/>
                :
                    <ContractOpen  onAdd={onAdd} onDelete={onDelete} />
            }
        <Pressable 
                style={styles.pressable}
                onPress={()=>{handleOpenContractArray()}}
                >
                <Animated.View style={{}}>
                    <Feather name="chevron-down" size={24} color="black" style={{transform:[{rotate: contractNumberArrayOpen? "180deg": "0deg"}]}}/>
                </Animated.View>
                </Pressable>
        </View>
    )
}

export default ContractManager

const styles = StyleSheet.create({
    container:{
        position: "relative",
        width:"100%",
        height:"auto",

    },
    pressable:{
        backgroundColor:"#E37322", 
        borderLeftColor:"#4C7D9F", 
        borderLeftWidth:2, 
        borderRadius:50,
        padding:5,
        position: "absolute",
        bottom:-10,
        right:5,
      }
})