import React from 'react'
import { View, Text, StyleSheet, Platform, ScrollView} from 'react-native'
import TextButton from './TextButton'
import { white } from '../utils/colors';

export default function CardQuestionAnswer({text, buttonText, buttonTextColor, backgroundColor, onPress}) {

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {text}
                    </Text>
                </View>
            </ScrollView>
            <TextButton 
                buttonTextColor={buttonTextColor}
                text={buttonText}
                style={styles.center}
                onPress={onPress} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        padding: 10,
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