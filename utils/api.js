import { AsyncStorage } from 'react-native';
import * as uuidv4 from 'uuid';

const FLASH_DECK = 'FLASH_DECK'

export async function createNewDeckAPI(deck) {
    const newDeck = {
        ...deck,
        // id: uuidv4(),
        questions: []
    }
    let currentDecks = await AsyncStorage.getItem(FLASH_DECK)
    currentDecks = (currentDecks === null) ? [] : JSON.parse(currentDecks)
    currentDecks.push(newDeck)
    await AsyncStorage.setItem(FLASH_DECK, JSON.stringify(currentDecks))
    return Promise.resolve(newDeck)
}

export async function fetchDecksAPI() {
    const decksStr = await AsyncStorage.getItem(FLASH_DECK)
    const decks = JSON.parse(decksStr)
    console.log(decks)
    return decks
}
