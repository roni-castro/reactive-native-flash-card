import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from './RoundedButton'
import Card from './Card'
import { green, red } from '../utils/colors'

class Quiz extends React.Component {

    state = {
        currentQuestionIndex: 0,
        numberOfCorrectAnswer: 0,
        finishedGame: false,
        isShowingQuestion: true,
    }

    toogleQuestionAnswer = () => {
        this.setState({
            isShowingQuestion: !this.state.isShowingQuestion
        })
    }

    OnCorrectButtonClick = () => {
        this.setState({
            numberOfCorrectAnswer: this.state.numberOfCorrectAnswer + 1
        }, 
        this.checkNextCardOrEndGame())
    }

    OnIncorrectButtonClick = () => {
        this.checkNextCardOrEndGame()
    }

    checkNextCardOrEndGame = () => {
        const { questions } = this.props
        const { currentQuestionIndex } = this.state
        if(currentQuestionIndex + 1 < questions.length) {
            this.setState({
                currentQuestionIndex: currentQuestionIndex + 1,
                isShowingQuestion: true
            })
        } else {
            this.setState({
                finishedGame: true
            })
        }
    }

    calculatePercentageScore = () => {
        const { questions } = this.props
        const { numberOfCorrectAnswer: numberOfCorrectAnswer } = this.state
        return Number((numberOfCorrectAnswer/questions.length) * 100).toFixed(2)
    }

    render() {
        const { questions } = this.props
        const { currentQuestionIndex, finishedGame, isShowingQuestion } = this.state

        if (finishedGame) {
            return (
                <View>
                    <Text style={styles.finalScore}>Percentage of correct cards: {this.calculatePercentageScore()}%</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.cardsCounter}>{currentQuestionIndex + 1}/{questions.length}</Text>
                <Card 
                    card={questions[currentQuestionIndex]} 
                    showQuestion={isShowingQuestion}
                    onPress={this.toogleQuestionAnswer}
                />
                <View style={styles.buttonContainer}>
                    <RoundedButton 
                        disabled={isShowingQuestion}
                        style={[styles.button, {backgroundColor: green}]} 
                        text='Correct' 
                        onPress={this.OnCorrectButtonClick}
                    />
                    <RoundedButton 
                        disabled={isShowingQuestion}
                        style={[styles.button, {backgroundColor: red}]} 
                        text='Incorrect' 
                        onPress={this.OnIncorrectButtonClick}
                    />
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
    answerStyle: {

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