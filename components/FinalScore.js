import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { red, green } from '../utils/colors';
import RoundedButton from './RoundedButton';
import { setLocalNotification, clearLocalNotification } from '../utils/notification'

const MINIMUM_RECOMMENDED_SCORE = 50

export default class FinalScore extends React.Component {

    state = {
        bounceValue: new Animated.Value(1),
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount() {
       this.createBouceAnimation()
       this.crateBackgroundColorAnimation()
       clearLocalNotification()
        .then(setLocalNotification)
    }

    crateBackgroundColorAnimation = () => {
        Animated.timing(                    // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 1800,               // duration of the animation
            }
          ).start();                        // Starts the animation
    }

    createBouceAnimation = () => {
        const { bounceValue } = this.state
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 500, toValue: 1.08 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 })
        ]).start()
    }

    calculatePercentageScore = () => {
        const { numberOfCorrectAnswer, numberOfCards } = this.props
        return Number((numberOfCorrectAnswer / numberOfCards) * 100).toFixed(2)
    }

    render() {
        const { bounceValue, fadeAnim } = this.state
        const { onRestartQuizButtonClick, onBackToDeckButtonClick } = this.props
        const percentScore = this.calculatePercentageScore()
        return (
            <Animated.View style={[
                styles.container, 
                { backgroundColor: percentScore >= MINIMUM_RECOMMENDED_SCORE ? green : red,
                  opacity: fadeAnim
                },
                ]}>
                <View style={styles.container}>
                    <Text style={styles.scoreText}>Correct cards: </Text>
                    <Animated.Text style={[styles.finalScore, { transform: [{ scale: bounceValue }] }]}>
                        {percentScore}%
                    </Animated.Text>
                </View>
                <View style={styles.buttonContainer}>
                    <RoundedButton
                        style={styles.button}
                        text='Restart Quiz'
                        onPress={onRestartQuizButtonClick} />
                    <RoundedButton
                        style={styles.button}
                        text='Back to Deck'
                        onPress={onBackToDeckButtonClick} />
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    scoreText: {
        textAlign: 'center',
        fontSize: 30
    },
    finalScore: {
        textAlign: 'center',
        fontSize: 40
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        marginTop: 24
    },
    button: {
        margin: 8,
    },
})