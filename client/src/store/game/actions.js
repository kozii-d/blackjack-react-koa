import {createAction} from "redux-actions";

const createRequestAction = (type, payloadCreator) => {
    const action = createAction(type, payloadCreator);
    action.success = type + '_SUCCESS';
    action.fail = type + '_FAIL';
    return action;
}

export const getToken = createRequestAction('GET_TOKEN', (data) => ({
    request: {
        method: 'post',
        url: '/api/login',
        data
    }
}))

export const getGameState = createRequestAction('GET_GAME', () => ({
    request: {
        url: '/api/game'
    }
}));

export const hit = createRequestAction('HIT', () => ({
    request: {
        method: 'post',
        url: '/api/hit'
    }
}));


export const stand = createRequestAction('STAND', () => ({
    request: {
        method: 'post',
        url: '/api/stand'
    }
}));


export const restart = createRequestAction('RESTART', () => ({
    request: {
        method: 'post',
        url: '/api/restart'
    }
}));

