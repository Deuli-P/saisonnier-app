import { StyleSheet, Image, View, Text } from 'react-native'
import {useRef} from 'react'
import Swiper from 'react-native-swiper';
const Slider = () => {

const swiperRef = useRef(null);

    const width = window.innerWidth;

  return (
    <Swiper
    ref={swiperRef}
    paginationStyle={{ bottom: 0 }}
    style={{width:width, height: "100%"}}
    showsButtons={false}
    loop={false}
    dotColor='white'
    activeDotColor='#ff9d2f'
    activeDotStyle={styles.activeDot}
    dotStyle={styles.unactiveDot} // Style for dots
  >
    <View style={styles.container}>
        <View style={styles.contentContainer}>

            <Image source={require("../../assets/img-intro/jober.jpg")} style={styles.images}/>
            <Text style={styles.text}>Si vous etes saisonniers et utilisé notre application...</Text>
        </View>
    </View>
    <View style={styles.container}>
        <View style={styles.contentContainer}>
            <Image source={require("../../assets/img-intro/commerce.jpg")} style={styles.images}/>
            <Text style={styles.text}>Lors d'une depense dans un de nos partenaires dans votre station...</Text>
        </View>
    </View>
    <View style={styles.container}>
        <View style={styles.contentContainer}>

            <Image source={require("../../assets/img-intro/qrcode-scan.jpg")} style={styles.images}/>
            <Text style={styles.text}>Vous pouvez scanner le QR code de votre compte pour obtenir des avantages...</Text>
        </View>
    </View>
    </Swiper>
  )
}

export default Slider

const styles = StyleSheet.create({
    unactiveDot: {
        borderColor: "#ff9d2f",
        borderWidth: 1,
        height: 20, // Set the desired height for the dots
        width: 20, // Set the desired width for the dots
        borderRadius: 25, // Set border radius for rounded dots
        marginHorizontal: 8, // Set the horizontal margin between dots
    },
    activeDot: {
        borderColor: "#ff9d2f",
        borderWidth: 1,
        height: 20, // Set the desired height for the dots
        width: 20, // Set the desired width for the dots
        borderRadius: 15, // Set border radius for rounded dots
        marginHorizontal: 3, // Set the horizontal margin between dots
      },
    images: {
        width: "90%",
        resizeMode: "contain",
        borderRadius: 10,
        maxHeight: 350,
    },
    container:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent:"center",
    },
    text:{
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        bottom: 45,
    },
    contentContainer:{
        flexDirection: "column",
        gap:30,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent:"flex-end",
    }

})