import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from './RoundedButton'

class Quiz extends React.Component {

    state = {
        currentQuestionIndex: 0,
        numberOfCorrectAnswear: 0,
        finishedGame: false
    }

    onShowAnswearClick = () => {

    }

    OnCorrectButtonClick = () => {

    }

    OnIncorrectButtonClick = () => {

    }

    calculatePercentageScore = () => {
        const { questions } = this.props
        const { numberOfCorrectAnswear } = this.state
        return (numberOfCorrectAnswear/questions.length)*100
    }

    render() {
        const { questions } = this.props
        const { currentQuestionIndex, finishedGame } = this.state

        if(finishedGame) {
            <View>
                <Text style={styles.finalScore}>Percentage of correct cards: {this.calculatePercentageScore()}%</Text>
            </View>
        }
        return (
            <View style={styles.container}>
                <Text style={styles.cardsCounter}>{currentQuestionIndex}/{questions.length}</Text>
                <Text style={styles.questionStyle}>
                    {questions[currentQuestionIndex].question}
                </Text>
                <Text style={styles.center} onPress={this.onShowAnswearClick}>Answer</Text>
                <View style={styles.buttonContainer}>
                    <RoundedButton style={styles.button} text='Correct' onPress={this.OnCorrectButtonClick}/>
                    <RoundedButton style={styles.button} text='Incorrect' onPress={this.OnIncorrectButtonClick}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    finalScore: {

    },
    cardsCounter: {

    },
    questionStyle: {
        textAlign: 'center',
        fontSize: 24
    },
    answearStyle: {

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
    center: {
        alignSelf: 'center'
    }
})

function mapStateTopProps(_, { navigation }) {
    const { questions } = navigation.state.params 
    return {
        questions
    }
}

export default connect(mapStateTopProps)(Quiz)