import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { white, red } from '../utils/colors';

export default function Card({ card }) {

    return (
        <View style={[styles.container]}>
            <Text style={styles.question}>
                {card.question}
            </Text>
            <Text style={styles.answer}>
                {card.answer.replace(/./g, '*')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    question: {
        color: red,
        fontSize: 20,
    },
    answer: {
        marginTop: 12,
        fontSize: 20,
    },
    container: {
        flex: 1,
        padding: 10,
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 16 : 4,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
    },
})