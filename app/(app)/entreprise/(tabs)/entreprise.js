import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import Logout from "../../../../components/Buttons/Logout";
import { FontAwesome } from "@expo/vector-icons";
import InputFake from "../../../../components/Input/InputFake-disable";

const entreprise = () => {
  const { entreprise } = useAuth();


  const horaireFake= [
    {id:"Monday", time:{morning:"8:00 - 12:00", afternoon:"14:00 - 18:00"}},
    {id:"Tuesday", time:{morning: "8:00 - 12:00", afternoon:"14:00 - 18:00"}},
    {id:"Wednesday", time:{morning: "8:00 - 12:00", afternoon:"14:00 - 18:00"}},
    {id:"Thursday", time:{morning: "8:00 - 12:00", afternoon:"14:00 - 18:00"}},
    {id:"Friday", time: {morning:"8:00 - 12:00", afternoon:"14:00 - 18:00"}},
    {id:"Saturday", time:{ morning:"close", afternoon:"14:00 - 18:00"}},
    {id:"Sunday", time: { morning:"close", afternoon:"close"}}
  ]

  // si time.morning === "close" && time.afternoon === "close" alors affiché close surtoute la ligne une fois

  // si time === 

  const renderHoraire=()=>{
    return horaireFake.map((item, index)=>{
      return(
        <View key={index} style={{flexDirection:"row", justifyContent:"space-between", padding:10, alignItems:"center"}}>
          <Text sryle={{textAlign:"start"}}>{item.id}</Text>
          <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center", padding:10,gap:10,}}> 
          { item.time.morning === "close" && item.time.afternoon === "close" ?
            <Text style={{width:"100%", textAlign:"center"}}>Close</Text> 
          : 
          (
            <>
              <Text style={{ textAlign:"center"}}>{item.time.morning}</Text>
              <Text style={{ textAlign:"center"}}>{item.time.afternoon}</Text>
            </>
          )}
          </View>
        </View>
      )
    })
  }

  const handleChangePicture=()=>{
    console.log('change picture')
  }
  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          gap: 30,
          marginTop: 40,
          alignItems: "center",
          position: "relative",
        }}
      >
        <View 
          style={{
          qposition: "relative",
          }}
        >
          <Image
            source={
              entreprise?.image
              ? { uri: entreprise.image }
              : require("../../../../assets/logo.png")
            }
            style={styles.profileImage}
            />
          <Pressable
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              backgroundColor: "#ff9d2f",
              padding: 10,
              borderRadius: 50,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
            }}
            onPress={()=>handleChangePicture()}
            >
            <FontAwesome name="picture-o" size={20} color="black" />
          </Pressable>
          </View>
        <Text stye={styles.name}>
          {entreprise ? entreprise.name : "Nom de l'entreprise"}
        </Text>
      </View>
      <View style={{width:"80%", marginVertical:20, gap:15}}>

        <InputFake title="Boss" value={entreprise?.email} />
        <InputFake title="Address" value={entreprise?.address} />
      </View>
      <View style={{width:"70%", alignItems:"center",gap:10}}>
        <Text style={{fontSize:20, fontWeight:"bold"}}>Horaires:</Text>
        <View style={{borderColor:"gray", borderWidth: 2, borderRadius: 10, marginBottom: 20}}>
          {renderHoraire()}
        </View>
      </View>
      <Logout />
    </View>
    </ScrollView>
  );
};

export default entreprise;

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 25,
  },
});
