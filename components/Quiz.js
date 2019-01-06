import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from './RoundedButton'
import CardQuestionAnswer from './CardQuestionAnswer'
import { green, red, orange, white, blue } from '../utils/colors'
import FinalScore from './FinalScore';
import CardFlip from 'react-native-card-flip';

const initialState = {
    currentQuestionIndex: 0,
    numberOfCorrectAnswer: 0,
    finishedGame: false,
    isShowingQuestion: true,
}
class Quiz extends React.Component {

    state = initialState

    toogleQuestionAnswer = () => {
        this.setState({
            isShowingQuestion: !this.state.isShowingQuestion
        })
        this.card.flip()
    }

    OnCorrectButtonClick = () => {
        this.setState({
            numberOfCorrectAnswer: this.state.numberOfCorrectAnswer + 1
        }, 
        this.checkNextCardOrEndGame())
        this.card.flip()
    }

    OnIncorrectButtonClick = () => {
        this.checkNextCardOrEndGame()
        this.card.flip()
    }

    onRestartQuizButtonClick = () => {
        this.setState(initialState)
    }

    onBackToDeckButtonClick = () => {
        this.props.goBack()
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
                    onBackToDeckButtonClick={this.onBackToDeckButtonClick}
                    onRestartQuizButtonClick={this.onRestartQuizButtonClick}
                />
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.cardsCounter}>{currentQuestionIndex + 1}/{questions.length}</Text>
                <CardFlip style={[styles.cardContainer]} ref={(card) => this.card = card}>
                    <CardQuestionAnswer 
                        text={questions[currentQuestionIndex].question} 
                        backgroundColor={orange}
                        buttonTextColor={white}
                        buttonText='Show Answer'
                        onPress={this.toogleQuestionAnswer}
                    />
                    <CardQuestionAnswer 
                        text={questions[currentQuestionIndex].answer}
                        backgroundColor={blue} 
                        buttonTextColor={white}
                        buttonText='Back to Question'
                        onPress={this.toogleQuestionAnswer}
                    />
                </CardFlip>
                <View style={[styles.buttonContainer]}>
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
    cardContainer:{
        flex:3,
        justifyContent: 'center',
    },
    cardsCounter: {
        fontSize: 18,
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
        questions,
    }
}

function mapDispatchToProps(_, { navigation }) {
    return {
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Quiz)