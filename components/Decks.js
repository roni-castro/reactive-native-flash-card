import React from 'react'
import { FlatList, View, TouchableOpacity, Alert, } from 'react-native';
import { connect } from 'react-redux'
import Deck from './Deck'
import { getDecks, deleteDeck } from '../actions/decks'
import { lightGray } from '../utils/colors';
import EmptyState from './EmptyState';

class Decks extends React.Component {

    state = {
        modalVisible: false,
    }

    componentDidMount() {
        this.props.getDecks()
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    deleteConfirmed = (deckId) => {
        this.props.deleteDeck(deckId)
    }

    onCardLongPressed = (deckId) => {
        Alert.alert(
            'Delete deck',
            'Are you sure to delete this deck',
            [
                { text: 'Cancel'},
                { text: 'Yes', onPress: () => this.deleteConfirmed(deckId) },
            ],
            { cancelable: true }
        )
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onLongPress={() => this.onCardLongPressed(item.id)}
                onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    { deck: item }
                )}>
                <Deck deck={item} />
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.props
        if(decks.length === 0) {
            return <EmptyState 
                title='Your deck list is empty'
                message='Add a new deck'
            />
        }
        return (
            <View style={{ flex: 1, backgroundColor: lightGray }}>
                {decks && <FlatList
                    data={decks}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
            </View>
        )
    }
}

function mapStateToProps({ decksReducer }) {
    return {
        decks: decksReducer.decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: () => dispatch(getDecks()),
        deleteDeck: (deckId) => dispatch(deleteDeck(deckId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)