import { DECREMENT, DELETEALL, FETCH_TODOS_ERROR, FETCH_TODOS_SUCCESS, INCREMENT } from "./actions";
import { fromJS, Map } from "immutable";

export interface IAppState {
    counter: any;
    lastUpdate: any;
    todoList: any[];
}

export const INITIAL_STATE: IAppState = {
    counter: 0,
    lastUpdate: null,
    todoList: []
}

export function rootReducer(state: Map<string, any> = Object.assign(fromJS(INITIAL_STATE)), action: any): Map<string, any> {
    switch (action.type) {
        case INCREMENT: {
            let currDate = new Date();
            let todoList = [...state.get('todoList')];
            const maxId = todoList && todoList.length ? todoList.sort((a: any, b: any) => b.id - a.id)[0].id + 1 : 1;
            const data = { ...{ id: maxId }, ...action.payload }
            return state.set('counter', state.get('counter') + 1).set('todoList', [...state.get('todoList'), data]).set('lastUpdate', `${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()} ${currDate.getHours() < 12 ? 'AM' : 'PM'}`);
        }
        case DECREMENT: {
            let currDate = new Date();
            return state.set('counter', state.get('counter') - 1).set('todoList', [...state.get('todoList')].filter(x => x.id !== action.payload?.id)).set('lastUpdate', `${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()} ${currDate.getHours() < 12 ? 'AM' : 'PM'}`);
        }
        case DELETEALL: {
            let currDate = new Date();
            return state.set('counter', 0).set('todoList', []).set('lastUpdate', `${currDate.getHours() > 9 ? currDate.getHours() : '0' + currDate.getHours().toString()}:${currDate.getMinutes() > 9 ? currDate.getMinutes() : '0' + currDate.getMinutes().toString()}:${currDate.getSeconds() > 9 ? currDate.getSeconds() : '0' + currDate.getSeconds().toString()} ${currDate.getHours() < 12 ? 'AM' : 'PM'}`);
        }
        case FETCH_TODOS_SUCCESS: {
            return state.set('counter', action.payload.length).set('todoList', [...action.payload]).set('lastUpdate', null);
        }
        case FETCH_TODOS_ERROR: {
            return state.set('counter', 0).set('todoList', []).set('lastUpdate', null);
        }
    }
    return state;
}