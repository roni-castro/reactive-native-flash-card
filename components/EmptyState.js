import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons' 
import { gray, lightGray } from '../utils/colors';

export default function EmptyState({title, message}) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name='cards-outline' size={60} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: gray,
        fontSize: 20,
        marginTop: 16,
    },
    message: {
        color: gray,
        marginTop: 16,
        fontSize: 20,
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGray,
    },
})