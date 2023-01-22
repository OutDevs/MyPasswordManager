// Importing Native components for proper functioning of the app
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Importing custom components to better configure the app (styling and back-end)
import Header from '../components/Header'
import Voltar from '../components/Voltar'
import firebase from '../config/firebase'
import { AntDesign } from '@expo/vector-icons';

// Beginning the configuration of the See Passwords screen - now not in use
const SeePW = ({ navigation, route }) => {

    // Defining the database (firestore)
    const database = firebase.firestore()

    // Getting params from the route (user and password id, password's name and actual password)
    let pw = route.params.category
    const id = route.params.id
    const newPassword = pw.newPassword
    const passwordName = pw.passwordName

    // Firebase function to delete a password
    function deleteCategory(id) {
        database.collection('Categories').doc(id).delete()
    }

    // Firebase function to update a password's name and 
    function updateCategoria(id) {
        database.collection('Categories').doc(id).update({
            passwordName: passwordName
        })
    }

    // Will return a Header with the password's name, a delete button and a go back button
    return (
        <View style={styles.container}>
            <Header title={passwordName} />
            <Text>{newPassword}</Text>
            <TouchableOpacity onPress={(id) => deleteCategory(id)}>
                <AntDesign name="closecircleo" size={26} color="red" />
            </TouchableOpacity>
            <Voltar navigation={navigation} />
        </View>
    );
}

// Style Sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    }
})

export default SeePW