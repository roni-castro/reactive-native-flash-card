import React from 'react'
import BorderedTextInput from './BorderedTextInput';
import RoundedButton from './RoundedButton';
import { View } from 'react-native';
import { addCardToDeck, editCard } from '../actions/decks'
import { connect } from 'react-redux'

class AddCard extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
    };

    state = {
        isEditing: false,
        question: '',
        answer: '',
        errorMessageQuestion: '',
        errorMessageAnswer: '',
    }

    componentDidMount() {
        const { card } = this.props
        if(card) {
            console.log(this.props.navigation)
            this.props.navigation.setParams({ title: 'Edit Card' })
            this.setState({
                isEditing: true,
                question: card.question,
                answer: card.answer,
            })
        } else {
            this.props.navigation.setParams({ title: 'Add Card' })
        }
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

        if(this.state.isEditing) {
            const { editCard, card } = this.props
            const cardToBeEdited = {
                ...card,
                question: this.state.question,
                answer: this.state.answer 
            }
            editCard(cardToBeEdited)
        } else {
            const { addCardToDeck, deckId } = this.props
            const card = {
                deckId,
                question: this.state.question,
                answer: this.state.answer 
            }
            addCardToDeck(card, deckId)
        }
        this.props.goBack();
    }

    render() {
        const { errorMessageAnswer: errorMessageAnswer, errorMessageQuestion, question, answer: answer } = this.state
        return (
            <View style={{margin: 16}}>
                <BorderedTextInput 
                    title='Question'
                    multiline={true}
                    maxHeight={80}
                    maxLength={200}
                    text={question}
                    placeholder='Type the question'
                    errorMessage={errorMessageQuestion}
                    onChangeText={this.onChangeQuestionInputText} />
                <BorderedTextInput 
                    title='Answer'
                    multiline={true}
                    maxHeight={80}
                    maxLength={240}
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
    const { deckId, card } = navigation.state.params
    return {
        deckId,  
        card,
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        addCardToDeck: (card, deckId) => dispatch(addCardToDeck(card, deckId)),
        editCard: (card) =>  dispatch(editCard(card)),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)