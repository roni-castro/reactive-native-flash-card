import React from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { red, green } from '../utils/colors';

const MINIMUM_RECOMMENDED_SCORE = 50

export default class FinalScore extends React.Component {

    state = {
        bounceValue: new Animated.Value(1),
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount() {
       this.createBouceAnimation()
       this.crateBackgroundColorAnimation()
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
        const percentScore = this.calculatePercentageScore()
        return (
            <Animated.View style={[
                styles.center, 
                { backgroundColor: percentScore >= MINIMUM_RECOMMENDED_SCORE ? green : red,
                  opacity: fadeAnim
                },
                ]}>
                <Text style={styles.scoreText}>Correct cards: </Text>
                <Animated.Text style={[styles.finalScore, { transform: [{ scale: bounceValue }] }]}>
                    {percentScore}%
                </Animated.Text>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})