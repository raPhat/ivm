import { ActionReducer, Action } from '@ngrx/store';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function authReducer(state: boolean = false, action: Action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return true;

        case LOGOUT_SUCCESS:
            return false;

        default:
            return state;
    }
}
