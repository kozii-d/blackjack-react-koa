import {createAction} from "redux-actions";

const createRequestAction = (type, payloadCreator) => {
    const action = createAction(type, payloadCreator);
    action.success = type + '_SUCCESS';
    action.fail = type + '_FAIL';
    return action;
}

export const getGameState = createRequestAction('GET_GAME', () => ({
    request: {
        url: '/game'
    }
}));

export const hit = createRequestAction('HIT', () => ({
    request: {
        method: 'post',
        url: '/hit'
    }
}));


export const stand = createRequestAction('STAND', () => ({
    request: {
        method: 'post',
        url: '/stand'
    }
}));


export const restart = createRequestAction('RESTART', () => ({
    request: {
        method: 'post',
        url: '/restart'
    }
}));

