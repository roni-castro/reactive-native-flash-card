import { AsyncStorage } from 'react-native';

const FLASH_DECK = 'FLASH_DECK'

export async function createNewDeckAPI(newDeck) {
    let currentDecks = await AsyncStorage.getItem(FLASH_DECK)
    currentDecks = (currentDecks === null) ? [] : JSON.parse(currentDecks)
    currentDecks.push(newDeck)
    await AsyncStorage.setItem(FLASH_DECK, JSON.stringify(currentDecks))
    return newDeck
}

export async function fetchDecksAPI() {
    const decksStr = await AsyncStorage.getItem(FLASH_DECK)
    const decks = JSON.parse(decksStr)
    return decks || []
}

export async function fetchDeckByIdAPI(deckId) {
    const decks = await fetchDecksAPI()
    const filteredDeck = decks.filter((element) => element.id === deckId)
    return (filteredDeck.length) > 0 ? filteredDeck[0] : null
}

export async function addCardToDeckAPI(card, deckId) {
    let decks = await fetchDecksAPI()
    const updatedDeck = decks.map(deck => {
        if(deck && deck.id === deckId) {
            deck.questions.push(card)
            return deck
        }
        return deck
    })
    await AsyncStorage.setItem(FLASH_DECK, JSON.stringify(updatedDeck))
    return fetchDeckByIdAPI(deckId)
}

export async function deleteDeckByIdAPI(deckId) {
    let decks = await fetchDecksAPI()
    const updatedDeck = decks.filter((deck) => deck.id !== deckId)
    await AsyncStorage.setItem(FLASH_DECK, JSON.stringify(updatedDeck))
    return deckId
}