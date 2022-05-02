import {handleActions} from "redux-actions";
import {getToken, getGameState, hit, stand, restart} from "./actions";

const defaultState = {
    token: localStorage.getItem('token'),
    game: null
};

const handleUpdateGameState = (state, {payload}) => {
    return {...state, game: payload.data};
}

const handleErrorUpdateGameState = (state) => {
    localStorage.clear();
    return {...state, token: null}
}

const handleUpdateToken = (state, {payload}) => {
    localStorage.setItem('token', payload.data.token);
    return {...state, token: payload.data.token, game: payload.data.game};
}

const handleErrorUpdateToken = (state) => {
    localStorage.clear();
    return {...state, token: null}
}

export default handleActions({
    [getToken.success]: handleUpdateToken,
    [getToken.fail]: handleErrorUpdateToken,
    // [getGameState]: handleUpdateGameState,
    [getGameState.success]: handleUpdateGameState,
    [getGameState.fail]: handleErrorUpdateGameState,
    // [hit]: handleUpdateGameState,
    [hit.success]: handleUpdateGameState,
    // [stand]: handleUpdateGameState,
    [stand.success]: handleUpdateGameState,
    // [restart]: handleUpdateGameState,
    [restart.success]: handleUpdateGameState,


}, defaultState);