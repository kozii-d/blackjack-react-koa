import {handleActions} from "redux-actions";
import {getGameState, hit, stand, restart} from "./actions";

const defaultState = null;

const handleUpdateGameState = (state, {payload}) => {
    return payload.data;
}

export default handleActions({
    [getGameState]: handleUpdateGameState,
    [getGameState.success]: handleUpdateGameState,
    [hit]: handleUpdateGameState,
    [hit.success]: handleUpdateGameState,
    [stand]: handleUpdateGameState,
    [stand.success]: handleUpdateGameState,
    [restart]: handleUpdateGameState,
    [restart.success]: handleUpdateGameState,


}, defaultState);