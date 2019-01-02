import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { black, white } from '../utils/colors';

export default function RoundedButton({text, onPress, style = {}}) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
             <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: white,
      padding: 8
    },
    button: {
        backgroundColor: black,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 16 : 4,
    }
})
