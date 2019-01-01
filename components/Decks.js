import React from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Deck from './Deck'
import { getDecks } from '../actions/decks'
import { lightGray } from '../utils/colors';

class Decks extends React.Component {

    componentDidMount() {
        this.props.getDecks()
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity 
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
        return (
            <View style={{flex: 1, backgroundColor: lightGray}}>
                {decks && <FlatList 
                    data={decks}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
            </View>
        )
    }
}

function mapStateToProps({decksReducer}) {
    return {
        decks: decksReducer.decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: () => dispatch(getDecks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)