import { StyleSheet, Text, View,Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, ReduceMotion, Easing } from "react-native-reanimated";
import ContractClose from './ContractClose';
import ContractOpen from './ContractOpen';


const ContractManager = () => {

    const [ childrenTest, setChildrenTest ] = useState(
        [
            {id:1,name:"11339D2"},
            {id:2 ,name:"2IQAKDE30R33"},
            {id:3 ,name:"DIEEO3E"},
            {id:4 ,name:"4DEZDK2"},
           {id:4,name: "5nknDK3"}
        ])

    const [ contractNumberArrayOpen, setContractNumberArrayOpen] = useState(true)
    
    const rotateChevron = useSharedValue(contractNumberArrayOpen? "180deg": "0deg")

    const handleOpenContractArray = () => {
        setContractNumberArrayOpen(!contractNumberArrayOpen)
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
                    <ContractClose data={childrenTest}/>
                :
                    <ContractOpen  data={childrenTest} setData={setChildrenTest}/>
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