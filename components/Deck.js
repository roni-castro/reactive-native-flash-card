import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';
import { red, white } from '../utils/colors'

export default function Deck({deck}) {
    if(!deck) {
        return null
    }
    return(
        <View style={styles.item}>
            <Text style={styles.title}>{deck.title}</Text> 
            {deck.questions && <Text style={styles.counter}>{deck.questions.length} cards</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 4,
        padding: 16,
        marginRight: 8,
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 4,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
    },
    title: {
        fontSize: 20,
        color: red,
    },
    counter: {
        fontSize: 16,
    }
})