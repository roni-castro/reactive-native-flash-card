
const initialState = {
    decks: [],
    error: null
};

import {
    ADD_NEW_DECK_SUCCESS,
    ADD_NEW_DECK_FAILURE,
    GET_FLASH_CARDS_SUCCESS,
    GET_FLASH_CARDS_FAILURE
} from '../actions/index'

function decks(state = initialState, action) {
    switch(action.type) {
        case GET_FLASH_CARDS_SUCCESS:
            return {
                ...state,
                decks: action.decks
            }
        case GET_FLASH_CARDS_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case ADD_NEW_DECK_SUCCESS: 
            return {
                ...state,
                decks: [...state.decks, action.deck],
            }
        case ADD_NEW_DECK_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default decks