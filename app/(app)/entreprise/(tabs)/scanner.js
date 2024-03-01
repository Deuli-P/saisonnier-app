import { Camera, CameraType,  } from 'expo-camera';
import { useState, useEffect, useCallback } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut,BounceIn ,BounceOut } from 'react-native-reanimated';
import InfiniteRotate from '../../../../components/Animations/InfiniteRotate';
import axios from 'axios';
import { useRouter,useNavigation, Link } from 'expo-router';

export default function scanner() {
  const [scanState, setScanState] = useState(undefined);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [messageError, setMessageError] = useState(false);
  const [testData, setTestData ] = useState("659407330ff2beccb7348a56")
  const [userTarget, setuserTarget] = useState({});

  const router = useRouter();
  const navigation = useNavigation();

  if (!permission || !permission.granted ) {
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={async()=>await requestPermission()} title="grant permission" />
        </View>
      );
  }


  const renderCheck = (userScanned) => {
    setScanState("validated");
    console.log("[SCANNER] scan valid");
        setTimeout(() => {
          console.log("[SCANNER] userScanned:", userScanned);
          router.push({
            pathname: '(app)/entreprise/cardById',
            params: {
              firstname: userScanned.firstname,
              lastname: userScanned.lastname,
              image: userScanned.image? userScanned.image : userScanned.userImage,
              address: userScanned.address,
            }
            });
          }, 300);
    setScanState("idle");
  }

  const renderError = () => {
    setScanState("error");
    setTimeout(() => {
      setMessageError(true);
      console.log("[SCANNER] scan error");
    }, 2000);
  }
  

  const handleScan = async(req) => {
    setScanState("processing");
    console.log(`[SCANNER] newData de type ${typeof req} est:`,req);
    console.log(`[SCANNER] newData de type ${typeof testData} est:`,testData);
    try{
      const data = req;
      console.log("[SCANNER] Debut du Axios");
      console.log(`[SCANNER] http://localhost:8002/entreprise/qrcode/${data}`);
      
      await axios.get(`http://localhost:8002/entreprise/qrcode/${data}`)
      .then((res) => {
        console.log("[SCANNER] Axios success:", res.data.user);
        setTimeout(() => {
          renderCheck(res.data.user);
        }, 500);
      })
    }
    catch(err){
      console.log("[SCANNER] Error est:", err.message);
    }
  }
  

  // Au scan d'un QR code :
  // Precessing du scan : loading qui tourne / entering fadeIn et exit fadeOut
  /// QRCode jwtdecode pour recup le userId:
  //// Si le userId est dans la base de donnée:
    /// scanState === "validated" => animation aparition check mark fadeIn et exit fadeOut
    /// setTimeOut 2s => Ouverture modal de la [CardById] de l'userId scanné
  //// Si QRCode pas bon: 
    /// scanState === "error" => animation aparition error icon fadeIn et exit fadeOut
    /// Message Modal : 
      //// Si QRcode pas de la base de donnée: "QRCode not found",
      //// Si QRCode dans base donnée mais pas dans la même station: "User not affiliate to this station",

    


  return (
    <View style={styles.container}>
        <Text style={styles.text}>Scan the QR code</Text>
      <View style={styles.cameraContainer}>
      <Camera 
        barCodeType="qr"
        style={styles.camera}
        type={CameraType.back}
        onBarCodeScanned={({ type, data }) => {
          console.log(`Scanned a ${type} barcode with data: ${data}`);
          if(type !== "org.iso.QRCode"){
            console.log("[SCANNER] type not found:", type);
            if(type != undefined){
              renderError()
            }
            return;
          }
          else{
            console.log("[SCANNER] QRCode scanned")
            setTestData(data);
            return;
          }
        }}
        >
          <View style={styles.cameraFocusContainer}>
            <View style={styles.cameraFocusTopLeft}/>
            <View style={styles.cameraFocusTopRight}/>
            <View style={styles.cameraFocusBottomLeft}/>
            <View style={styles.cameraFocusBottomRight}/>
          </View>
        </Camera>
      </View>
      <Animated.View entering={FadeIn.duration(250)} exiting={FadeOut.duration(200)}  style={{backgroundColor:messageError?"pink": "transparent", paddingHorizontal:16, paddingVertical:8, borderColor:messageError?"red": "transparent", borderWidth:1,justifyContent:"center",alignItems:'center',marginTop:20}}>
        <Text style={{ color:messageError?'red': "transparent",fontSize:30, fontWeight:"bold",textAlign: "center"}}>QRCode not found</Text>
      </Animated.View>
      <View 
        style={[
            styles.stateContainer,
            {
              backgroundColor:
                scanState === "error"? "#A54545":
                scanState === "validated" ? "#83A95D": 
                "#EAC464",
              borderLeftColor:"red",
              borderLeftWidth:2
            }
        ]}
      >
          {scanState === "processing" ? (
            <InfiniteRotate />
            ) :
            scanState === "validated" ? (
              <Animated.View entering={BounceIn.duration(500)} exiting={BounceOut.duration(200)} style={{ justifyContent:"center", alignItems:"center"}}>
                <AntDesign name="check" size={52} color="#191818" />
              </Animated.View>
              ) :
            scanState === "error" ? (
              <Animated.View entering={BounceIn.duration(500)} exiting={BounceOut.duration(200)} style={{ justifyContent:"center", alignItems:"center"}}>
                <MaterialIcons name="error" size={52} color="#191818" />
              </Animated.View>
              ) : 
              (
                <Pressable onPress={()=>handleScan(testData)} style={{justifyContent:"center", alignItems:"center"}}>
                  <Text style={{color:"#191818",fontSize: 26}}>Scan</Text>
                </Pressable>
              )
            }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#242734"
  },
  camera: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#ECE1E1",
    marginTop: 90,
  },
  cameraContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E37322',
    overflow: 'hidden',
    marginTop: 30,
  },
  cameraFocusContainer: {
    width: "80%",
    height: "80%",
    position: "relative",
  },
  cameraFocusTopLeft:{
    position: "absolute",
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 10,
    borderColor: "white",
  },
  cameraFocusTopRight:{
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 10,
    borderColor: "white",
  },
  cameraFocusBottomLeft:{
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 10,
    borderColor: "white",
  },
  cameraFocusBottomRight:{
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 10,
    borderColor: "white",
  },
  stateContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
