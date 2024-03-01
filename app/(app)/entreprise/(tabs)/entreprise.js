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
import { FontAwesome, Feather } from "@expo/vector-icons";
import InputFake from "../../../../components/Input/InputFake-disable";
import HoraireShow from "../../../../components/Profile/HoraireArray/HoraireShow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Avatar from "../../../../components/Profile/Avatar";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, ReduceMotion, Easing } from "react-native-reanimated";


const entreprise = () => {

  const rotateChevron = useSharedValue(contractNumberArrayOpen? "180deg": "0deg")

  const { userId, setEntreprise, entreprise } = useAuth();

  const [ data, setData ] = useState(null);
  const [ contractNumberArrayOpen, setContractNumberArrayOpen] = useState(false)


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

  const handleOpenContractArray = () => {
    setContractNumberArrayOpen(!contractNumberArrayOpen)
  }

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ 
      rotate: withTiming(
        rotateChevron.value)
    }],
  }));


  const handleChangePicture=()=>{
    console.log('change picture')
  }



  return (
  !data? 
      ( 
        <SafeAreaView style={{ flex: 1, alignItems: "center",backgroundColor: "#242734" }}>
          <Text>Loading...</Text>
          <Logout />

        </SafeAreaView>
      )
    :
      (
    <ScrollView style={{backgroundColor: "#242734"}}>
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          gap: 30,
          marginTop: 40,
          alignItems: "center",
          position: "relative",
        }}
      >
       <Avatar accountType={"entreprise"} url={`https://localhost:8002/entreprise/profile/image/${userId}`} item={entreprise?.image? entreprise.image: data?.image? data.image : null} setDataImage={setData}/>
        <Text stye={styles.name}>
          {data ? data.name : "Nom de l'entreprise"}
        </Text>
      </View>
      <View style={{width:"80%", marginVertical:20, gap:15}}>

        <InputFake title="Boss" value={data?.proprietaire} />
        <InputFake title="Address" value={data?.address} />
      </View>
        <HoraireShow data={data.horaires}/>



        {/* CONTRACT SECTION */}
        <View>
          <Text style={{color:'#ECE1E1', fontSize:24, fontWeight:"bold" }}>Contracts</Text>
          <View style={{backgroundColor:"white", width:"90%", height: 'auto',position:'relative'}}>
            {data.contractNumber?.map((element, index) => {
              <View style={{backgroundColor:"white"}}>
                <FontAwesome name="file-o" size={24} color="black" /> 
              </View>
              })
            }
            <Pressable 
              style={{
                backgroundColor:"#E37322", 
                borderLeftColor:"#4C7D9F", 
                borderLeftWidth:2, 
                padding:5,
                position: "absolute",
                bottom:0,
                right:5,
              }}
              onPress={()=>{handleOpenContractArray()}}
              >
              <Animated.View style={{}}>
                <Feather name="chevron-down" size={24} color="black" style={{transform:[{rotate: contractNumberArrayOpen? "180deg": "0deg"}]}}/>
              </Animated.View>
            </Pressable>
          </View>
        </View>
          {/* CONTRACT SECTION */}
        <Logout />
        <View style={{height:100}}/>
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
  name:{
    fontSize: 32,
    color: "#EAC464",
    fontWeight: "bold",
  }
});
