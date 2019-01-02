import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from './RoundedButton'
import Card from './Card'
import { green, red } from '../utils/colors'
import FinalScore from './FinalScore';

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

    render() {
        const { questions } = this.props
        const { currentQuestionIndex, finishedGame, isShowingQuestion, numberOfCorrectAnswer } = this.state

        if (finishedGame) {
            return (
                <FinalScore 
                    numberOfCorrectAnswer={numberOfCorrectAnswer}
                    numberOfCards={questions.length} 
                />
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
    cardsCounter: {
        fontSize: 16,
        marginBottom: 16
    },
    questionStyle: {
        textAlign: 'center',
        fontSize: 24
    },
    answerStyle: {
        marginTop: 16
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

function mapStateTopProps(_, { navigation }) {
    const { questions } = navigation.state.params 
    return {
        questions
    }
}

export default connect(mapStateTopProps)(Quiz)