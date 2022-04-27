import {createAction} from "redux-actions";

export const updateGame = createAction('UPDATE_GAME', payload => payload);

// export const updateGame = createAction('UPDATE_GAME', () => ({
//     payload: {
//         request: {
//             url: '/game'
//         }
//     }
// }));