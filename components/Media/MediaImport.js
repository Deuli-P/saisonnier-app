import { Modal, Pressable, StyleSheet, Text, View} from 'react-native'
import { useState, useEffect } from 'react'
import { usePost } from '../../app/context/PostContext';
import { Ionicons } from '@expo/vector-icons';
import CameraPicker from './Camera';
import ImportPicker from './Import';

const MediaImport = ({setModalOpen, modalOpen, accountType}) => {
    
    const [ media, setMedia ] = useState(null);

    const aspect = [16,9];
    // clique sur element ouvre une modal
    // modal avec 2 boutons: prendre une photo, choisir une photo
    // si prendre une photo, ouvre la camera
    // si choisir une photo, ouvre la gallerie
    // Si prendre photo choisie 
        // Si andoid alors demande permission
        // si photo profile aspect : 1 / 1 si 
        // si post aspect : automatique 
        // Qualité : 1 
        // si annuler alors rien
    // Si galerie choisie
        // ouvrir la galerie
        // si profile : 1 photo
        // si post : plusieurs photos possible
        // si annuler alors rien
    // envoyer la photo dans le composant parent


  return (
    <>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onPress={()=>setModalOpen(false)}
        onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalOpen(false);
        }}

        >
        <Pressable style={styles.modal} onPress={()=>setModalOpen(false)}>
            <View style={styles.container}>
                <CameraPicker setMedia={setMedia} aspect={aspect}/>
                <ImportPicker setMedia={setMedia} aspect={aspect} media={media}/>
            </View>
            <Pressable onPress={()=>setModalOpen(false)}
                 style={styles.closePressable}
            >
                <Text style={styles.closeText}>Cancel</Text>
            </Pressable>
        </Pressable>
    </Modal>
    </>
  )
}

export default MediaImport

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    container:{
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
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
    pickMediaPressable:{
        paddingHorizontal:16,
        paddingVertical: 8,
        backgroundColor: "#FFB800",
        borderRadius: 20,
    },
    pickMediaText:{
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    closePressable:{
        bottom: 130,
        position: "absolute",
        paddingHorizontal:16,
        paddingVertical: 8,
        backgroundColor: "#FFB800",
        borderRadius: 20,
    },
    closeText:{
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    }
})