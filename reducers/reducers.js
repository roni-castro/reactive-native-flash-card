
const initialState = {
    decks: [],
    error: null
};

import {
    ADD_NEW_DECK_SUCCESS,
    ADD_NEW_DECK_FAILURE,
    GET_FLASH_CARDS_SUCCESS,
    GET_FLASH_CARDS_FAILURE,
    GET_SPECIFIC_DECK_SUCCESS,
    GET_SPECIFIC_DECK_FAILURE,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAILURE,
    EDIT_CARD_SUCCESS,
    EDIT_CARD_FAILURE,
    DELETE_DECK_SUCCESS,
    DELETE_DECK_FAILURE,
    DELETE_CARD_SUCCESS,
    DELETE_CARD_FAILURE
} from '../actions/index'

export function decksReducer(state = initialState, action) {
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
        case DELETE_DECK_SUCCESS: 
            return {
                ...state,
                decks: state.decks.filter((deck) => deck.id !== action.deckId),
            }
        case DELETE_DECK_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case DELETE_CARD_SUCCESS: 
            return {
                ...state,
                decks: state.decks.map(deck => deck.id === action.deck.id ? action.deck : deck)
            }
        case DELETE_CARD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case ADD_CARD_SUCCESS: 
            return {
                ...state,
                decks: state.decks.map(deck => deck.id === action.deck.id ? action.deck : deck)
            }
        case ADD_CARD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case EDIT_CARD_SUCCESS: 
            return {
                ...state,
                decks: state.decks.map(deck => deck.id === action.deck.id ? action.deck : deck)
            }
        case EDIT_CARD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

const initialDeckState = {
    deck: {},
    error: null
}

export function specificDeckReducer(state = initialDeckState, action) {
    switch(action.type) {
        case GET_SPECIFIC_DECK_SUCCESS:
            return {
                ...state,
                deck: action.deck
            }
        case GET_SPECIFIC_DECK_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case ADD_NEW_DECK_SUCCESS: 
            return {
                ...state,
                deck: action.deck,
            }
        case ADD_CARD_SUCCESS: 
            return {
                ...state,
                deck: action.deck
            }
        case ADD_CARD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case EDIT_CARD_SUCCESS: 
            return {
                ...state,
                deck: action.deck
            }
        case EDIT_CARD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case DELETE_DECK_SUCCESS: 
            return {
                ...state,
                deck: {},
            }
        case DELETE_DECK_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case DELETE_CARD_SUCCESS: 
            return {
                ...state,
                deck: action.deck
            }
        case DELETE_CARD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}