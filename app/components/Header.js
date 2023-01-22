// Importing Native components for proper functioning of the app
import React from 'react'
import { Text, StyleSheet } from 'react-native'

// Importing colors to handle variable colors from a single source file
import colors from '../config/colors'

// Exporting function Header, which recieves a prop to determin the title of Each Page
export default function Header(props) {

    // This function will return a text with the title of a page styled similarly to a <h1>, and underlined
    return (
        <Text style={styles.title}>{props.title}</Text>
    )
}

// Style Sheet
const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        color: 'black',
        paddingBottom: 8,
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: colors.primary,
    },
})