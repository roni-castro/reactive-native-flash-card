import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { red } from '../utils/colors';

export default function TextButton({text, onPress, style = {}}) {
    return (
        <TouchableOpacity onPress={onPress}>
             <Text style={[styles.textStyle, style]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
      textAlign: 'center',
      color: red,
    }
})
