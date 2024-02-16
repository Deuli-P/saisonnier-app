import { StyleSheet,Pressable, Platform } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';

const ImportPicker = ({setMedia, media, aspect}) => {

    const [ data, setData ] = useState(null);

    const verifyPermission = () => {
        const [status, requestPermission] = ImagePicker.requestMediaLibraryPermissionsAsync();
        if ( status === PermissionStatus.UNDETERMINED){
            const permissionResponse = requestPermission();

            return permissionResponse.granted;
        }
        if ( status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient permission!',
                'You need to grant camera access to use this app'
            );
            return false
        }
        return true;
    }

    const pickImageAsync = async () => {
        console.log("[IMPORT;MEDIA] Ouverture de la gallerie");
        if( Platform.OS === 'android'){
            const hasPermission = await verifyPermission();
            if (!hasPermission){
                console.log("[IMPORT;MEDIA] Permission import image refusée");
                return;
            }
        }
        try{

            await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                quality: 1,
                aspect: aspect,
            }).then((result)=>{
                if (!result.canceled){
                    const source = { uri: result.assets[0].uri };
                    console.log("[IMPORT;MEDIA] Image importée:",source);

                    setData(source) // Test to check if the problem is to using props
                    setMedia(source); // the true target to my import image
                    console.log("[IMPORT;MEDIA] Media dans post:",media);
                    console.log("[IMPORT;MEDIA] Data dans post:",data);
                } else {
                    alert('You did not select any image.');
                }
            })
        }
        catch(e){
            console.log("[[IMPORT;MEDIA] Erreur lors de l'import de l'image post",e);
        };
    }
        
        useEffect(() => {
        console.log("[IMPORT;MEDIA] Import de media dans post,",media);
      }, [media])

    return (
        <Pressable style={styles.pressable} onPress={()=>pickImageAsync()}>
            <Ionicons name="image" size={40} color="black" style={styles.icons}/>
        </Pressable>
    )
}

export default ImportPicker

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