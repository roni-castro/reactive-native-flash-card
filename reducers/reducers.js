
const initialState = {
    cards: []
};

import {
    ADD_FLASH_CARD,
    GET_FLASH_CARDS
} from '../actions/index'

function flashCards(state = initialState, action) {
    switch(action.type) {
        case GET_FLASH_CARDS:
            return {
                ...state,
                cards: cards.push(action.cards)
            }
        case ADD_FLASH_CARD: 
            return {
                ...state,
                cards: cards.push(action.card)
            }
        default:
            return state
    }
}

export default flashCards