import React from 'react'
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux'
import Card from './Card'

class Decks extends React.Component {

    renderItem = ({item}) => {
        return (
            <Card card={item} />
        )
    }

    render() {
        const { cards } = this.props
        return (
            <View>
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