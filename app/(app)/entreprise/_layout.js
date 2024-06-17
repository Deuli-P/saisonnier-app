import { Stack } from "expo-router"
const _layout = () => {
    return (
      <Stack>
          <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
          <Stack.Screen name='cardById' options={{headerShown: false, presentation:"modal",  animation: 'fade_from_bottom'}}/>
      </Stack>
    )
  }
  
  export default _layout
  