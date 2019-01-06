import React from 'react'
import RoundedButton from './RoundedButton'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { red } from '../utils/colors';
import { getDeckById, deleteCard } from '../actions/decks'
import Card from './Card'
import EmptyState from './EmptyState';

class DeckDetail extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const { deck } = navigation.state.params 
        return {
            title: `Deck: ${deck.title}`
        }
    }

    componentDidMount() {
        this.props.getDeck(this.props.deckId)
    }

    onCardLongPressed = (card) => {
        Alert.alert(
            'Delete card',
            'Are you sure to delete this card',
            [
                { text: 'Cancel'},
                { text: 'Yes', onPress: () => this.deleteConfirmed(card) },
            ],
            { cancelable: true }
        )
    }

    deleteConfirmed = (card) => {
        this.props.deleteCard(card)
    }

    startQuiz = () => {
        const { deck, navigation } = this.props
        navigation.navigate(
            'Quiz',
            { questions: deck.questions }
        )
    }

    addNewCardToDeck = () => {
        const { deckId, navigation } = this.props
        navigation.navigate(
            'AddCard', 
            { deckId }
        )
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onLongPress={() => this.onCardLongPressed(item)}
                onPress={() => this.props.navigation.navigate(
                    'AddCard',
                    {card: item}
                )}>
                <Card card={item} />
            </TouchableOpacity>
        )
    }

    render() {
        const { deck } = this.props
        return (
            <ScrollView>
                <View style={styles.buttonContainer}>
                    <RoundedButton style={styles.button} text='Add Card' onPress={this.addNewCardToDeck} />
                    <RoundedButton disabled={!deck.questions || deck.questions.length === 0} style={styles.button} text='Start Quiz' onPress={this.startQuiz} />
                </View>
                <View style={styles.container}>
                    {deck.questions && <Text style={styles.counter}>{deck.questions.length} cards</Text>}
                    {deck.questions && deck.questions.length > 0 && <FlatList
                        data={deck.questions}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                    {deck.questions && deck.questions.length === 0 && 
                        <EmptyState 
                            title='You have no card in this deck'
                            message='Click on Add card'
                        />
                    }
                </View>
            </ScrollView>
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
        getDeck: (deckId) => dispatch(getDeckById(deckId)),
        deleteCard: (card) => dispatch(deleteCard(card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)