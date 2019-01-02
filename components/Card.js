import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import TextButton from './TextButton'
import { white } from '../utils/colors';

export default function Card({card, showQuestion, onPress}) {

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>
                {showQuestion ? card.question : card.answer}
            </Text>
            <TextButton 
                text={showQuestion ? 'Answer' : 'Question'}
                style={styles.center}
                onPress={onPress} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 4,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 24
    },
    center: {
        alignSelf: 'center'
    }
})