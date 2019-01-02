import React from 'react'
import BorderedTextInput from './BorderedTextInput';
import RoundedButton from './RoundedButton';
import { View } from 'react-native';
import { addCardToDeck } from '../actions/decks'
import { connect } from 'react-redux'

class AddCard extends React.Component {

    state = {
        question: '',
        answear: '',
        errorMessageQuestion: '',
        errorMessageAnswear: '',
    }

    onChangeQuestionInputText = (text) => {
        this.setState({question: text})
    }

    onChangeAnswearInputText = (text) => {
        this.setState({answear: text})
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
        if(this.state.answear === '') {
            this.setState({
                errorMessageAnswear: 'Field cannot be empty'
            })
            return
        } else {
            this.setState({
                errorMessageAnswear: ''
            })
        }
        const card = {
            question: this.state.question,
            answear: this.state.answear 
        }
        const { addCardToDeck, deckId, goBack } = this.props
        addCardToDeck(card, deckId)
        goBack();
    }

    render() {
        const { errorMessageAnswear, errorMessageQuestion, question, answear } = this.state
        return (
            <View style={{margin: 16}}>
                <BorderedTextInput 
                    title='Question'
                    text={question}
                    placeholder='Type the question'
                    errorMessage={errorMessageQuestion}
                    onChangeText={this.onChangeQuestionInputText} />
                <BorderedTextInput 
                    title='Answear'
                    text={answear}
                    placeholder='Type the answear'
                    errorMessage={errorMessageAnswear}
                    onChangeText={this.onChangeAnswearInputText} />
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