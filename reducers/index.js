import { combineReducers } from 'redux';
import { decksReducer, specificDeckReducer} from './reducers';

export default combineReducers({
    decksReducer,
    specificDeckReducer,
})
