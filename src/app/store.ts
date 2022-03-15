import { INCREMENT } from "./actions";
import { fromJS, Map } from "immutable";

export interface IAppState {
    counter: number;
}

export const INITIAL_STATE: IAppState = {
    counter: 0
}

export function rootReducer(state: IAppState = INITIAL_STATE, action: any): IAppState {
    switch (action.type) {
        case INCREMENT:
            return { counter: state.counter + 1 };
    }
    return state;
}