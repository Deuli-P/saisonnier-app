import { StyleSheet, Text, View } from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

  
const BUTTON_WIDTH = 280;
const BUTTON_HEIGHT = 70;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;
// La longueur de la barre de swipe - le padding_button 
const H_SWIPE_RANGE = -BUTTON_WIDTH + 5 * BUTTON_PADDING  ;


// DONE : original : trash button at left side
  // swiper to the left to delete
  // text appear when button is swiped
// when swiper completed, item is deleted

const SwiperTrash = ({onDelete, numero}) => {
    // Animated value for X translation
    const X = useSharedValue(0);
    // Toggled State
    const [toggled, setToggled] = useState(false);


  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      console.log("Swipe:",numero);
      setToggled(isToggled);
      handleDeleteItem();
    }
  };


  const handleDeleteItem = () => {
      onDelete(numero)
  };


      // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue <= 0 && newValue >= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    // A la fin de l'animation
      // si X.value == a la range de swipe alors on supprime l'item
    onEnd: () => {
      console.log("[TRASH] onEnd");
      if (X.value > H_SWIPE_RANGE * 0.8){
        X.value = withSpring(0);
        console.log("[TRASH]", X.value);
      } else {
          console.log("[TRASH] onEnd swipe complet");
          runOnJS(handleComplete)(true);
          console.log("[TRASH] Supprimé");
          X.value = withSpring(H_SWIPE_RANGE - BUTTON_PADDING );
      }
    },
  }
);

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    // Animated Style for the swipe container
    swipeCont: useAnimatedStyle(() => {
      return {
       
      };
    }),
    // Animated Style for the color wave
    colorWave: useAnimatedStyle(() => {
      return {
        opacity: interpolate(X.value, InterpolateXInput, [0,1]),
      };
    }),
    // Animated Style pour le bouton trash
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
      };
    }),
    // Animated Style pour le text de confirmation
    swipeText: useAnimatedStyle(() => {
      return {
        // opacity: interpolate(
        //   X.value,
        //   InterpolateXInput,
        //   [0,1],
        //   Extrapolate.CLAMP,
        // )
      };
    }),
    swipeArrow: useAnimatedStyle(() => {
      return {
        transform: interpolate(
          X.value,
          InterpolateXInput,
          [0,-20],
          Extrapolate.CLAMP,
        )
      }
    }),
  };


  return (
    <Animated.View style={[styles.swipeCont,AnimatedStyles.swipeCont]}>
      {/* bouton trash */}
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
          <FontAwesome name="trash" size={24} color="red" />
        </Animated.View>
      </PanGestureHandler>
      {/* bouton trash */}
      {/* barre et text de confirmation */}
      <Animated.View style={[styles.colorWave, AnimatedStyles.colorWave]}>
        <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
          Confirm the deletion
        </Animated.Text>
      </Animated.View>
      {/* barre et text de confirmation */}
    </Animated.View>

  )
}

export default SwiperTrash

const styles = StyleSheet.create({
    swipeCont: {
        position: 'absolute',
        right: BUTTON_PADDING,
        height: BUTTON_HEIGHT,
        width: "100%",
        borderRadius: BUTTON_HEIGHT,
        padding: BUTTON_PADDING,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    colorWave: {

        backgroundColor:"#BBBBC0",
        height: "auto" ,
        width:BUTTON_WIDTH,
        borderRadius: BUTTON_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeable: {
        position: 'absolute',
        left: -5,
        height: SWIPEABLE_DIMENSIONS,
        width: SWIPEABLE_DIMENSIONS,
        borderRadius: SWIPEABLE_DIMENSIONS,
        backgroundColor:"pink",
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeText: {
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 2,
        color: 'black',
    },
    });
