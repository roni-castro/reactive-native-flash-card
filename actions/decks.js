
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
    DELETE_CARD_FAILURE,
} from '../actions/index'
import { v4 as uuid } from 'uuid';

import { 
    createNewDeckAPI, 
    fetchDecksAPI, 
    fetchDeckByIdAPI,
    addCardToDeckAPI,
    editCardToDeckAPI,
    deleteDeckByIdAPI,
    deleteCardAPI
} from '../utils/api';

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

export function deleteDeck(deckId) {
    return (dispatch) => {
        deleteDeckByIdAPI(deckId)
        .then(deckIdRemoved => dispatch(onDeleteDeckSuccess(deckIdRemoved)))
        .catch(err => dispatch(onDeleteDeckError(err)))
    }
}

const onDeleteDeckSuccess = (deckId) => ({
    type: DELETE_DECK_SUCCESS,
    deckId
})

const onDeleteDeckError = (error) => ({
    type: DELETE_DECK_FAILURE,
    error
})

export function deleteCard(card) {
    return (dispatch) => {
        deleteCardAPI(card)
        .then(deck => dispatch(onDeleteCardSuccess(deck)))
        .catch(err => dispatch(onDeleteCardError(err)))
    }
}

const onDeleteCardSuccess = (deck) => ({
    type: DELETE_CARD_SUCCESS,
    deck
})

const onDeleteCardError = (error) => ({
    type: DELETE_CARD_FAILURE,
    error
})

export function getDeckById(deckId) {
    return (dispatch) => {
        fetchDeckByIdAPI(deckId)
        .then(deck => dispatch(onFetchDeckSuccess(deck)))
        .catch(err => dispatch(onFetchDeckError(err)))
    }
}

const onFetchDeckSuccess = (deck) => ({
    type: GET_SPECIFIC_DECK_SUCCESS,
    deck
})

const onFetchDeckError = (error) => ({
    type: GET_SPECIFIC_DECK_FAILURE,
    error
})

export function addCardToDeck(card, deckId) {
    const newCard = {
        ...card,
        deckId,
        id: uuid()
    }

    return (dispatch) => {
        addCardToDeckAPI(newCard, deckId)
        .then((deck) => dispatch(onAddCardDeckSuccess(deck)))
        .catch((err) => dispatch(onAddCardDeckError(err)))
    }
}

const onAddCardDeckSuccess = (deck) => ({
    type: ADD_CARD_SUCCESS,
    deck
})

const onAddCardDeckError = (error) => ({
    type: ADD_CARD_FAILURE,
    error
})

export function editCard(card) {
    return (dispatch) => {
        editCardToDeckAPI(card)
        .then((deck) => dispatch(onEditCardDeckSuccess(deck)))
        .catch((err) => dispatch(onEditCardDeckError(err)))
    }
}

const onEditCardDeckSuccess = (deck) => ({
    type: EDIT_CARD_SUCCESS,
    deck
})

const onEditCardDeckError = (error) => ({
    type: EDIT_CARD_FAILURE,
    error
})