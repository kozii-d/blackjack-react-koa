import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";

import gameReducer from './game/reducer'
import {token} from "./game/selectors";

const rootReducer = combineReducers({
    gameReducer
})

const client = axios.create();

const middlewareConfig = {
    interceptors: {
        request: [
            function ({getState}, req) {
                req.headers['Authorization'] = token(getState());
                return req;
            }
        ]
    }
};

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(axiosMiddleware(client, middlewareConfig))
));
