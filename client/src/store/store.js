import {createStore, combineReducers} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import gameReducer from './game/reducer'

const rootReducer = combineReducers({
    gameReducer
})

export const store = createStore(rootReducer, composeWithDevTools());
