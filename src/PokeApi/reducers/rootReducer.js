import { combineReducers } from 'redux';
import pokeReducers from './pokeReducers'


const rootReducer = combineReducers({
	pokemon: pokeReducers,
})

export default rootReducer;