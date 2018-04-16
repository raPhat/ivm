import { ActionReducer, Action } from '@ngrx/store';

export const SETTING_UP = 'SETTING UP';
export const SETTING_END = 'SETTING END';

export function settingReducer(state: string = null, action: Action) {
    switch (action.type) {
        case SETTING_UP:
            return SETTING_UP;

        case SETTING_END:
            return SETTING_END;

        default:
            return state;
    }
}
