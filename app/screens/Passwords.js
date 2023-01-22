// Importing Native components for proper functioning of the app
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

// Importing custom components to better configure the app (styling and back-end)
import Header from '../components/Header'
import Footer from '../components/Footer'
import firebase from '../config/firebase'

// Beginning the configuration of the Passwords screen
const Passwords = ({ navigation }) => {

    // Defining the database we are using (in case, firebase's firestore)
    const database = firebase.firestore()

    // Fetching all passwords from firestore and storing them in the 'categories' array
    const [categories, setCategories] = useState([])
    useEffect(() => {
        // Will display a new password in the screen whenever a change is observed in the database
        database.collection('Categories').onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            })
            setCategories(list);
        })
    }, [])

    // Definig the two states of the password, to allow the user to see it when he clickes it - initially set to hidden (false)
    const [seePW, setSeePW] = useState(false)

    // The Passwords screen will render a container with a title, the user's passwords and the footer
    return (
        <View style={styles.container}>
            <Header title="Senhas" />
            {/*Comenting until SeePW.js file is useable again
            
            {categories.map((category) => {
                return (
                    <View key={category.id} style={styles.wrapper}>
                        <TouchableOpacity style={styles.input} onPress={() => { navigation.navigate('SeePW', { category: category }) }}>
                            <Text>{category.passwordName}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })} */}
            {/* Each password from the database will be displayed as a button, which will toggle the passwords visibility when clicked */}
            {categories.map((category) => {
                return (
                    <TouchableOpacity style={styles.input} key={category.passwordName} onPress={() => setSeePW(!seePW)}>
                        {seePW
                            ?
                            <Text>{category.newPassword}</Text>
                            :
                            <Text>{category.passwordName}</Text>
                        }
                    </TouchableOpacity>
                )
            })}
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
    // wrapper: {
    //     width: '100%',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-around'
    // },
    input: {
        width: 200,
        height: 50,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
})

export default Passwords