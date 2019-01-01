import React from 'react'
import TextButton from './TextButton'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { red } from '../utils/colors';
import { getDeckById } from '../actions/decks'

class DeckDetail extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const { deck } = navigation.state.params 
        return {
            title: deck.title
        }
    }

    componentDidMount() {
        this.props.getDeck(this.props.deckId)
    }

    startQuiz = () => {
        
    }

    addNewCardToDeck = () => {
        const { deckId, navigation } = this.props
        navigation.navigate(
            'AddCard', 
            { deckId }
        )
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{deck.title}</Text> 
                {deck.questions && <Text style={styles.counter}>{deck.questions.length} cards</Text>}
                <View style={styles.buttonContainer}>
                    <TextButton style={styles.button} text='Add Card' onPress={this.addNewCardToDeck} />
                    <TextButton style={styles.button} text='Start Quiz' onPress={this.startQuiz} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 16,
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
    title: {
        fontSize: 28,
        color: red,
        alignSelf: 'center',
        margin: 8,
    },
    counter: {
        fontSize: 20,
        margin: 8,
        alignSelf: 'center',
    }
})

function mapStateToProps({specificDeckReducer}, { navigation }) {
    const { deck } = navigation.state.params 
    return {
        deckId: deck.id,
        deck: specificDeckReducer.deck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDeck: (deckId) => dispatch(getDeckById(deckId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)