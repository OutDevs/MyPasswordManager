import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native'
//import Icon from '@react-native-vector-icons/dist/MaterialCommunityIcons'


const Select = ({ options, onChangeSelect }) => {

    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <Text></Text>
                {/* <Icon name={"chevron-down"} /> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingLeft: 40,
        marginHorizontal: 20,
        borderRadius: 8,
        fontSize: 18,
        borderWidth: 1,
    },
})

export default Select