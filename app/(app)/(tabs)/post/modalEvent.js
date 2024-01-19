import { StyleSheet, Text, TextInput, View} from 'react-native'
import React from 'react'
import SubmitButton from '../../../../components/Buttons/Submit'
import Close from '../../../../components/Buttons/goBack/Close'

const modalEvent = () => {

    const handleSubmit = () => {
        console.log('[MODALEVENT]valider event')
    }
  return (
    <View>
        <View>
            <Close />
        
        </View>
        <Text>modalEvent</Text>
        <View>
            <Text> Titre de l'évenement</Text>
        {/* input pour le titre de l'event  */}
        <TextInput placeholder='Titre de l evenement' style={styles.input}/>
        </View>
        <View>

        {/* input pour media couverture de l'event  */}
        </View>
        <View>
            <View>
            <Text> Date de debut</Text>
        {/* input pour la date du debut */} 
            <TextInput />
            </View>
            <View>
            <Text> Heure de debut</Text>
        {/* input pour l'heure du debut */} 
            <TextInput />
            </View>

        </View>
        <View>
            <View>
            <Text> Date de fin</Text>
        {/* input pour la date de fin */} 
            <TextInput />
            </View>
            <View>
            <Text> Heure de fin</Text>
        {/* input pour l'heure de fin */} 
            <TextInput />
            </View>

        </View>

        <View>
        {/* input pour le lieu */}
            <TextInput placeholder='Lieu' style={styles.input}/>
        </View>
        <View>
            <TextInput placeholder='Description' multiline={true} numberOfLines={4} style={styles.inputTextArea}/>
        {/* input description */}
        </View>
        <View>

        {/* input nom des intervenants */}
        </View>
        <View>
        {/* button validation */}
            <SubmitButton text="Valider" action={() => handleSubmit()}/>
        </View>
    </View>

  )
}

export default modalEvent

const styles = StyleSheet.create({})