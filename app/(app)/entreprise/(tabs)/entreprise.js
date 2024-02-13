import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";
import Logout from "../../../../components/Buttons/Logout";
import { FontAwesome } from "@expo/vector-icons";
import InputFake from "../../../../components/Input/InputFake-disable";
import HoraireShow from "../../../../components/Profile/HoraireArray/HoraireShow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


const entreprise = () => {

  const { userId, setEntreprise, entreprise } = useAuth();

  const [ data, setData ] = useState(null);


  useEffect(()=>{
    if(!data){
      if(entreprise){
        setData(entreprise)
      }
      else{  
          AsyncStorage.getItem("authToken").then(async(value) => {
          const token = value;
          const id = jwtDecode(token).userId;
          await axios.get(`http://localhost:8002/entreprise/profile/${id}`)
          .then((res) => {
              setEntreprise(res.data.user);
              setData(res.data.user);
        })
      })
    }
    }
  },[data])

  // si time.morning === "close" && time.afternoon === "close" alors affiché close surtoute la ligne une fois

  // si time === 



  const handleChangePicture=()=>{
    console.log('change picture')
  }



  return (
  !data? 
      ( 
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
          <Text>Loading...</Text>
          <Logout />

        </SafeAreaView>
      )
    :
      (
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
          position: "relative",
          }}
        >
          <Image
            source={
              data?.image
              ? { uri: data.image }
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
              borderColor:"#db6612",
               borderLeftWidth: 2,
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
            <FontAwesome name="picture-o" size={18} color="black" />
          </Pressable>
          </View>
        <Text stye={styles.name}>
          {data ? data.name : "Nom de l'entreprise"}
        </Text>
      </View>
      <View style={{width:"80%", marginVertical:20, gap:15}}>

        <InputFake title="Boss" value={data?.proprietaire} />
        <InputFake title="Address" value={data?.address} />
      </View>
        <HoraireShow data={data.horaires}/>
        <Logout />
    </View>
    </ScrollView>
      )
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
