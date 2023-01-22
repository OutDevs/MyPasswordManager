// Importing Native components for proper functioning of the app
import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

// Importing custom components to better configure the app (styling and back-end)
import Header from '../components/Header'
import Footer from '../components/Footer'
import colors from '../config/colors'
import firebase from '../config/firebase'
import { generatePassword } from '../components/generatePassword'

// Beginning the configuration of the Main screen
const Main = ({ navigation, route }) => {

    // Storing the users information here, which came through the "route" parameter
    const user = route.params.user

    // Main body of the Main screen, will allow the user to generate a password
    function Body() {

        // Defining variables which will be sent to the "generatePassword" component, to generate the password, depending on the amount of digits, letters and symbols
        const [digitCount, setDigitCount] = useState(2)
        const [lowerCaseCount, setLowerCaseCount] = useState(3)
        const [upperCaseCount, setUpperCaseCount] = useState(2)
        const [symbolCount, setSymbolCount] = useState(1)
        const [generatedPassword, setGeneratedPassword] = useState('Su4S&nh4')

        // Will display 4 inputs, one for each type of character
        return (
            <>
                <TextInput
                    style={{ textAlign: 'center' }}
                    keyboardType="numeric"
                    placeholder="Números"
                    onChangeText={(value) => {
                        setDigitCount(parseInt(value));
                    }}
                />
                <TextInput
                    style={{ textAlign: 'center' }}
                    keyboardType="numeric"
                    placeholder="Minúsculas"
                    onChangeText={(value) => {
                        setLowerCaseCount(parseInt(value));
                    }}
                />
                <TextInput
                    style={{ textAlign: 'center' }}
                    keyboardType="numeric"
                    placeholder="Maiúsculas"
                    onChangeText={(value) => {
                        setUpperCaseCount(parseInt(value));
                    }}
                />
                <TextInput
                    style={{ textAlign: 'center' }}
                    keyboardType="numeric"
                    placeholder="Símbolos"
                    onChangeText={(value) => {
                        setSymbolCount(parseInt(value));
                    }}
                />
                {/* A button, that will actually send the information to the generator and back */}
                <Button
                    onPress={() => {
                        setGeneratedPassword(
                            generatePassword(
                                lowerCaseCount,
                                upperCaseCount,
                                symbolCount,
                                digitCount
                            )
                        );
                    }}
                    title="Gerar Senha"
                />
                {/* Will then display the password generated to the user */}
                <Text>Sua senha: {generatedPassword}</Text>
                {/* Save button which will go to a confirmation saving screen and pass user information and the password */}
                <Button
                    onPress={() => { navigation.navigate('SavePW', { user: user, newPassword: generatedPassword }) }}
                    title="Salvar Senha"
                />
            </>
        )
    }

    // Firebase logout function, to allow the user to reenter with another account or simply exit the app more safely
    function logout() {
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login")
        }).catch((error) => { })
    }

    // Custom component with a button which will execute the above function
    function Logout() {
        return (
            <TouchableOpacity
                style={styles.logout}
                onPress={logout}
            >
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        )
    }

    // The Main screen will render a container with a title, the logout button, the footer (with navigating capabilities) and a Body, which is better explained above
    return (
        <View style={styles.container}>
            <Header title="Gerar Nova Senha" />
            <Body navigation={navigation} />
            <Logout />
            <Footer navigation={navigation} />
        </View>
    );
}

// Style Sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    logout: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: colors.secondary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoutText: {
        color: colors.primary,
        fontSize: 16,
    },
})

export default Main