// Importing Native components for proper functioning of the app
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native'

// Importing custom components to better configure the app (styling and back-end)
import colors from '../config/colors'
import firebase from '../config/firebase'

// Beginning the configuration of the Login screen
const Login = ({ navigation }) => {

    // Defining three variables which control the user's authentication
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState(false)

    // SignIn function
    // Will submit to firebase the email and password entered and create an account with those credentials
    const signUpFirebase = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            let user = userCredential.user
            navigation.navigate("Main", { user: user })
        })
            .catch((error) => {
                setErrorLogin(true)
            });
    }

    // Login function
    // Will submit to firebase the email and password entered and verify if the user has an account, if so, will navigate to the main screen
    const loginFirebase = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            let user = userCredential.user
            navigation.navigate("Main", { user: user })
        })
            .catch((error) => {
                setErrorLogin(true)
            })
    }

    // Every time the app loads, will check if the user has already signed in, if so, will navigate to main screen
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                navigation.navigate("Main", { user: user.uid })
        });
    }, []);

    // This function will return a screen with a "Welcome" title, two inputs, one for email, one for password, and a submit button
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.title}>Bem-vindo</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail aqui"
                type="text"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Sua senha aqui"
                type="text"
                onChangeText={setPassword}
                value={password}
            />
            {/* Checks if the email or password is incorret, if so, will display a text with a button to try again */}
            {errorLogin === true
                ?
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Email ou senha inválidos! <TouchableOpacity onPress={() => { setEmail(''), setPassword('') }}><Text style={styles.tOtext}>Tente novamente</Text></TouchableOpacity></Text>
                </View>
                :
                <View></View>
            }
            {/* The button will only be clickable if neither field is empty */}
            {email === "" || password === ""
                ?
                <TouchableOpacity
                    disabled={true}
                    style={styles.buttonLogin}
                >
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={loginFirebase}
                >
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity
                style={styles.signUp}
                onPress={signUpFirebase}
            >
                <Text>Cadastrar-se</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

// Exporting Login screen to use in the Navigation Stack
export default Login

// Style Sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 48,
        color: colors.primary,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        width: 300,
        marginTop: 10,
        padding: 10,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: colors.preto,
    },
    buttonLogin: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 50,
        marginTop: 30,
    },
    textButtonLogin: {
        color: colors.primary,
        fontSize: 16,
    },
    errorContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        paddingLeft: 10,
        color: colors.gray,
    },
    signUp: {
        marginTop: 20,
    },
    tOtext: {
        textDecorationColor: colors.primary,
        textDecorationLine: 'underline'
    }
})
