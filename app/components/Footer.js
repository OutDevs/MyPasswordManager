// Importing Native components for proper functioning of the app
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Importing colors to handle variable colors from a single source file
import colors from '../config/colors'

// exporting function Footer, which recieves the navigation prop, to navigate between screens
export default function Footer({ navigation }) {

    // This function will return a container containing two buttons, the first which will navigate to the main screen and the second to navigate to the passwords screen
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('Main') }} style={styles.button}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Passwords') }} style={styles.button}>
                <Text style={styles.buttonText}>Passwords</Text>
            </TouchableOpacity>
        </View>
    )
}

// Style Sheet
const styles = StyleSheet.create({
    container: {
        bottom: 0,
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        height: 50,
        fontSize: 32,
        width: '100%',
        paddingTop: 8,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: colors.primary,
        borderLeftColor: colors.primary,
    },
    buttonText: {
        width: 80,
        textAlign: 'center',
        color: colors.black,
    }
})