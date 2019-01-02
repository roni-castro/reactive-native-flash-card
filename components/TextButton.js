import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { red } from '../utils/colors';

export default function TextButton({text, onPress, buttonTextColor = red, style = {}}) {
    return (
        <TouchableOpacity onPress={onPress}>
             <Text style={[styles.textStyle, {color: buttonTextColor}, style]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
      textAlign: 'center',
      fontSize: 16
    }
})
