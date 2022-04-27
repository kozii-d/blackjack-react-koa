import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";

import gameReducer from './game/reducer'

const rootReducer = combineReducers({
    gameReducer
})

const client = axios.create();

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(axiosMiddleware(client))
));
