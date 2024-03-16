import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';


const ContractClose = ({data}) => {

    // pouquoi cela n'affiche pas les enfants?

    console.log("[CONTRACTCLOSE] Array:",data);
  return (
    data ?
                (
                    <View style={styles.container}>
                        {data.map((item,index) => {
                            return(
                                <View style={styles.contractContainer} key={`contract-${index}`}>
                                    <FontAwesome name="file-text" size={28} color="black" />
                                </View>
                            )
                            })
                        }
                    </View>
                )
            : 
                (
                    <View style={styles.container}>
                        <Text style={styles.text}>Aucun contrat</Text>
                    </View>
                )
            )
}

export default ContractClose

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor: "#767592",
        flexDirection: "row",
        flexWrap:'wrap',
        gap: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    contractContainer:{
        backgroundColor:"#D9D9D9",
        width:45,
        height:45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    }
})