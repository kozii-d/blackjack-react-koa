import {handleActions} from "redux-actions";
import {updateGame} from "./actions";

const defaultState = null;

const handleUpdateGameState = (state, {payload}) => {
    console.log(payload)
    return payload;
}

export default handleActions({
    [updateGame]: handleUpdateGameState,
    [updateGame + '_SUCCESS']: handleUpdateGameState
}, defaultState);