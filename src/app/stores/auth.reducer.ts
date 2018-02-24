import { ActionReducer, Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function authReducer(state: string = null, action: Action) {
    switch (action.type) {
        case LOGIN:
            return LOGIN;

        case LOGOUT:
            return LOGOUT;

        default:
            return state;
    }
}
