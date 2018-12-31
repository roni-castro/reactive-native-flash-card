
import {
    ADD_NEW_DECK_SUCCESS,
    ADD_NEW_DECK_FAILURE,
    GET_FLASH_CARDS_SUCCESS,
    GET_FLASH_CARDS_FAILURE
} from '../actions/index'
import { v4 as uuid } from 'uuid';

import { createNewDeckAPI, fetchDecksAPI } from '../utils/api';

export function createNewDeck(deck) {
    const newDeck = {
        ...deck,
        id: uuid(),
        questions: []
    }

    return (dispatch) => {
        createNewDeckAPI(newDeck)
        .then((deck) => dispatch(onCreateNewDeckSuccess(deck)))
        .catch((err) => dispatch(onCreateNewDeckError(err)))
    }
}

const onCreateNewDeckSuccess = (deck) => ({
    type: ADD_NEW_DECK_SUCCESS,
    deck: deck
})

const onCreateNewDeckError = (error) => ({
    type: ADD_NEW_DECK_FAILURE,
    error: error
})

export function getDecks() {
    return (dispatch) => {
        fetchDecksAPI()
        .then(decks => dispatch(onFetchDecksSuccess(decks)))
        .catch(err => dispatch(onFetchDecksError(err)))
    }
}

const onFetchDecksSuccess = (decks) => ({
    type: GET_FLASH_CARDS_SUCCESS,
    decks
})

const onFetchDecksError = (error) => ({
    type: GET_FLASH_CARDS_FAILURE,
    error
})