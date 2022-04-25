import {handleActions} from "redux-actions";
import {updateGame} from "./actions";

const defaultState = null;

const handleUpdateGameState = (state, {payload}) => {
    return payload;
}

export default handleActions({
    [updateGame]: handleUpdateGameState
}, defaultState);