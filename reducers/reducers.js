
// const initialState = {
//         React: {
//           title: 'React',
//           questions: [
//             {
//               question: 'What is React?',
//               answer: 'A library for managing user interfaces'
//             },
//             {
//               question: 'Where do you make Ajax requests in React?',
//               answer: 'The componentDidMount lifecycle event'
//             }
//           ]
//         },
//         JavaScript: {
//           title: 'JavaScript',
//           questions: [
//             {
//               question: 'What is a closure?',
//               answer: 'The combination of a function and the lexical environment within which that function was declared.'
//             }
//           ]
//         }
//       }
//   };

import {
    ADD_FLASH_CARD,
    GET_FLASH_CARDS
} from '../actions/index'

function flashCards(state= {}, action) {
    switch(action.type) {
        case GET_FLASH_CARDS:
            return {
                ...state,
                ...action.cards
            }
        case ADD_FLASH_CARD: 
            return {
                ...state,
                ...action.card
            }
        default:
            return state
    }
}

export default flashCards