import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { blue, red } from '../utils/colors';

export default function BorderedTextInput({
    title = '', 
    text = '',
    placeholder = '', 
    errorMessage= '', 
    onChangeText = null, 
    maxLength = 2000,
    style = {},
    ...props}
) {
    return (
        <View>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                   {...props}
                    maxLength={maxLength}
                    value={text}
                    style={[styles.textInput, style]}
                    selectionColor={blue}
                    onChangeText={onChangeText}
                    placeholder={placeholder} />
            </View>
            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        padding: 4,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 16 : 4,
    },
    textInput: {
        paddingLeft: 15,
        paddingRight: 15
    },
    text: {
        marginBottom: 4,
        marginLeft: 4
    },
    error: {
        padding: 2,
        fontSize: 12,
        color: red
    }
})