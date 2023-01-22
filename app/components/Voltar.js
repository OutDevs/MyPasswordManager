// Importing Native components for proper functioning of the app
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

// Importing colors to handle variable colors from a single source file
import colors from '../config/colors'

// Exporting function Voltar, which recieves navigation prop, to navigate between screens
export default function Voltar({ navigation }) {

    // This function will return a button which will take the user back to the previous screen
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigation.goBack() }}
        >
            <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
    )
}

// Style Sheet
const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 40,
        borderColor: colors.primary,
        left: 20,
        bottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
    },
    buttonText: {
        fontWeight: '400',
        color: colors.white,
    },
})