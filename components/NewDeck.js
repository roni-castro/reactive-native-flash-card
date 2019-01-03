import React from 'react'
import BorderedTextInput from './BorderedTextInput';
import RoundedButton from './RoundedButton';
import { View } from 'react-native';
import { createNewDeck } from '../actions/decks'
import { connect } from 'react-redux'

class NewDeck extends React.Component {

    state = {
        title: '',
        errorMessage: '',
        
    }

    onChangeText = (text) => {
        this.setState({ title: text })
    }

    onSubmit = () => {
        if (this.state.title === '') {
            this.setErrorMessage('Field cannot be empty')
            return
        }
        const deckToBeCreated = { title: this.state.title }
        this.props.createDeck(deckToBeCreated)
        this.reset()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.deck !== this.props.deck){
            const { deck } = this.props
            if (deck != null && deck.id) {
                this.showDeckDetail(deck)
            }
        }
    }

    showDeckDetail = (deck) => {
        this.props.navigation.navigate(
            'DeckDetail',
            { deck }
        )
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
            <View style={{ margin: 16 }}>
                <BorderedTextInput
                    title='Title'
                    maxLength={35}
                    text={title}
                    placeholder='Type the title of the deck'
                    errorMessage={errorMessage}
                    onChangeText={this.onChangeText} />
                <RoundedButton
                    style={{ marginTop: 20 }}
                    text='SUBMIT'
                    onPress={this.onSubmit} />
            </View>
        )
    }
}

function mapStateToProps({specificDeckReducer}) {
    return {
        deck: specificDeckReducer.deck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createDeck: (deck) => dispatch(createNewDeck(deck)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)