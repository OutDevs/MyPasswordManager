// Importing Native components for proper functioning of the app
import React, { useState } from 'react'
import {
    TouchableOpacity,
    Text,
    SafeAreaView,
    Modal,
    View,
    FlatList,
    Button,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

// Importing custom components to better configure the app (styling and back-end)
import Header from '../components/Header'
import Voltar from '../components/Voltar'
import { categoriesList } from '../config/categoriesList'
import firebase from '../config/firebase';

// Beginning the configuration of the Save Passwords screen
const SavePW = ({ navigation, route }) => {

    // Defining the user and database we are dealing with
    const user = route.params.user
    const database = firebase.firestore()

    // Storing the password that came from the previous screen in a variable
    // const [category, setCategory] = useState('Selecione uma categoria');
    const newPassword = route.params.newPassword

    // For the Modal component (now deactivated) - 
    const [selected, setSelected] = useState('')
    // const [modalVisible, setModalVisible] = useState(false)

    function addUserPassword(passwordName) {
        database.collection('users').doc(user).collection('Categories').add({
            // category: category,
            passwordName: passwordName,
            newPassword: newPassword,
        })
    }

    // Incluir senha (apelido e senha mesmo) no banco de dados
    function addPassword(passwordName) {
        database.collection('Categories').add({
            // category: category,
            passwordName: passwordName,
            newPassword: newPassword,
        })
    }

    // function renderOption(item) {
    //     return (
    //         <TouchableOpacity style={[styles.optionContainer, { backgroundColor: item.id == selected ? '#eee' : '#fff' }]} onPress={() => {
    //             setSelected(item.id)
    //             setCategory(item.name)
    //             setModalVisible(false)
    //         }}>
    //             <Text style={[styles.optionTxt, { fontWeight: item.id == selected ? 'bold' : 'normal' }]}>{item.name}</Text>
    //             {item.id == selected && (
    //                 <AntDesign name="check" size={22} color="green" />
    //             )}
    //         </TouchableOpacity>
    //     )
    // }

    // Main Body of the Save Passwords screen, will allow the user to save the password with a nickname
    function Body({ navigation }) {

        // Definir apelido
        // const [nick, setNick] = useState('')
        const [passwordName, setPasswordName] = useState('')

        // Will display an input for the user to determine the password's 'name' and a button to send it to the database
        return (
            <SafeAreaView style={styles.body}>
                {/* <Text>Categoria:</Text>
                <TouchableOpacity style={styles.conteiner} onPress={() => setModalVisible(true)}>
                    <Text style={styles.txt} numberOfLines={1}>{category}</Text>
                    <AntDesign name="down" size={26} color="blue" />
                </TouchableOpacity>
                <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <AntDesign name="left" size={26} color="#555" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Selecione uma categoria</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={categoriesList || []}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => renderOption(item)}
                    />
                </Modal> */}
                <Text>Apelido:</Text>
                <TextInput
                    style={styles.input}
                    value={passwordName}
                    onChangeText={setPasswordName}
                    placeholder="Digite um apelido para sua senha aqui"
                />
                <Button
                    onPress={() => { navigation.navigate("Passwords"), addPassword(passwordName), addUserPassword(passwordName) }}
                    title="Save"
                />
            </SafeAreaView>
        )
    }

    // The Save Password screen will render a container with a title, the back button (Voltar) and the Body, which is better explained above
    return (
        <View style={styles.container}>
            <Header title="Salvar Senha" />
            <Body navigation={navigation} />
            <Voltar navigation={navigation} user={user} />
        </View>
    );
}

// Getting the width of the screen
const { width } = Dimensions.get('window')

// Style Sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: 50,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa',
        justifyContent: 'space-between',
    },
    conteiner: {
        height: 50,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa',
        justifyContent: 'space-between',
    },
    txt: {
        fontSize: 16,
        color: '#555',
        width: width - 90,
    },
    headerModal: {
        paddingBottom: 12,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: 18,
        color: '#555',
    },
    modalCancel: {
        fontSize: 14,
        color: 'blue',
        fontWeight: '600',
    },
    optionContainer: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'space-between',
    },
    optionTxt: {
        fontSize: 16,
        color: '#555',
    }
})

export default SavePW