import { INCREMENT } from "./actions";
import { fromJS, Map } from "immutable";

export interface IAppState {
    counter: any;
}

export const INITIAL_STATE: IAppState = {
    counter: 0
}

export function rootReducer(state: Map<string, any> = Object.assign(fromJS(INITIAL_STATE)), action: any): Map<string, any> {
    switch (action.type) {
        case INCREMENT:
            return state.set('counter', state.get('counter') + 1);
    }
    return state;
}