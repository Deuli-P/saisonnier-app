import { Alert, StyleSheet,Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

function CameraPicker({ setMedia, aspect}){

  
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    async function verifyPermission(){
        const permissions = await ImagePicker.getCameraPermissionsAsync();
        console.log("[PICK;MEDIA] Permissions:",permissions);
        if ( permissions.status !== 'granted'){
            const permissionResponse = await ImagePicker.requestCameraPermissionsAsync();

            return permissionResponse.granted;
        }
        if ( permissions.status === 'denied'){
            Alert.alert(
                'Insufficient permission!',
                'You need to grant camera access to use this app'
            );
            return false
        }
        return true;
    }

    const pickImage = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission){
            log("[PICK;MEDIA] Permission camera refusée");
            return;
        }
        try{
            console.log("[PICK;MEDIA] Ouverture de la camera");
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
                aspect: aspect,

            });
            if (!result.canceled) {
                console.log("[PICK;MEDIA] Image prise en photo:",result);
                setMedia(result.assets[0].uri);
            } else {
                console.log("[PICK;MEDIA] Aucune image prise en photo");
                alert('You did not select any image.');
            }
        }
        catch(e){
            console.log("[[PICK;MEDIA] Erreur lors de l'upload de la photo post",e);
        }
    }


    return (
        <Pressable onPress={()=>pickImage()} style={styles.pressable}>
            <Ionicons name="camera" size={40} color="black" style={styles.icons}/>
        </Pressable>
    )
}

export default CameraPicker;

const styles = StyleSheet.create({
    pressable:{
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: "white",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    icons:{
    },
})