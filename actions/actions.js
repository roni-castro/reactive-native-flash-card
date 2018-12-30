
import {
    GET_FLASH_CARDS,
    ADD_FLASH_CARD
} from './index'


export const onGetFlashCards = (cards) => ({
    type: GET_FLASH_CARDS,
    cards
})

export const addFlashCard = (card) => ({
    type: ADD_FLASH_CARD,
    card
})