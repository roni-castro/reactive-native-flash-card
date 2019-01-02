import React from 'react'
import BorderedTextInput from './BorderedTextInput';
import RoundedButton from './RoundedButton';
import { View } from 'react-native';
import { addCardToDeck } from '../actions/decks'
import { connect } from 'react-redux'

class AddCard extends React.Component {

    state = {
        question: '',
        answer: '',
        errorMessageQuestion: '',
        errorMessageAnswer: '',
    }

    onChangeQuestionInputText = (text) => {
        this.setState({question: text})
    }

    onChangeAnswerInputText = (text) => {
        this.setState({answer: text})
    }

    onSubmit = () => {
        if(this.state.question === '') {
            this.setState({
                errorMessageQuestion: 'Field cannot be empty'
            })
            return
        } else {
            this.setState({
                errorMessageQuestion: ''
            })
        }
        if(this.state.answer === '') {
            this.setState({
                errorMessageAnswer: 'Field cannot be empty'
            })
            return
        } else {
            this.setState({
                errorMessageAnswer: ''
            })
        }
        const card = {
            question: this.state.question,
            answer: this.state.answer 
        }
        const { addCardToDeck, deckId, goBack } = this.props
        addCardToDeck(card, deckId)
        goBack();
    }

    render() {
        const { errorMessageAnswer: errorMessageAnswer, errorMessageQuestion, question, answer: answer } = this.state
        return (
            <View style={{margin: 16}}>
                <BorderedTextInput 
                    title='Question'
                    text={question}
                    placeholder='Type the question'
                    errorMessage={errorMessageQuestion}
                    onChangeText={this.onChangeQuestionInputText} />
                <BorderedTextInput 
                    title='Answer'
                    text={answer}
                    placeholder='Type the answer'
                    errorMessage={errorMessageAnswer}
                    onChangeText={this.onChangeAnswerInputText} />
                 <RoundedButton 
                    style={{marginTop: 20}} 
                    text='SUBMIT' 
                    onPress={this.onSubmit} /> 
            </View>
        )
    }
}

function mapStateToProps({}, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,  
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        addCardToDeck: (card, deckId) => dispatch(addCardToDeck(card, deckId)),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)