import React from 'react'
import BorderedTextInput from './BorderedTextInput';
import RoundedButton from './RoundedButton';
import { View } from 'react-native';
import { createNewDeck } from '../actions/decks'
import { connect } from 'react-redux'

class NewDeck extends React.Component {

    state = {
        title: '',
        errorMessage: ''
    }

    onChangeText = (text) => {
        this.setState({title: text})
    }

    onSubmit = () => {
        if(this.state.title === '') {
            this.setErrorMessage('Field cannot be empty')
            return
        }
        const deck = { title: this.state.title }
        this.props.createDeck(deck)
        this.reset();
    }

    setErrorMessage = (errorMessage) => {
        this.setState({
            errorMessage
        })
    }

    reset = () => {
        this.setState({
            title: '',
            errorMessage: ''
        })
    }

    render() {
        const { errorMessage, title } = this.state
        return (
            <View style={{margin: 16}}>
                <BorderedTextInput 
                    title='Title'
                    text={title}
                    placeholder='Type the title of the deck'
                    errorMessage={errorMessage}
                    onChangeText={this.onChangeText} />
                 <RoundedButton 
                    style={{marginTop: 20}} 
                    text='SUBMIT' 
                    onPress={this.onSubmit} /> 
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createDeck: (deck) => dispatch(createNewDeck(deck)),
    }
}

export default connect(null, mapDispatchToProps)(NewDeck)