import React from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Card from './Card'
import { gray, lightGray } from '../utils/colors';

class Decks extends React.Component {

    renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate(
                    'DeckDetail', 
                    { card: item }
                )}>
                <Card card={item} />
            </TouchableOpacity>
        )
    }

    render() {
        const { cards } = this.props
        return (
            <View style={{flex: 1, backgroundColor: lightGray}}>
                {cards && <FlatList 
                    data={cards}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
            </View>
        )
    }
}

function mapStateToProps({cards}) {
    return {
        cards: cards
    }
}

export default connect(mapStateToProps)(Decks)