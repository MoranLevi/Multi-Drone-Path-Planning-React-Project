import { AnyAction } from 'redux';
import { ITodoItem } from 'src/interfaces/ITodoItem';
import { ActionTypes } from 'src/redux/ActionTypes';

interface TodoReducer {
    todos:          ITodoItem[]
}

const INITIAL_STATE: TodoReducer = {
    todos:          [],
};

const Reducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.TODO.DATA.SET_TODOS: {
            const todos: ITodoItem[] = action.payload.todos;
            return { ...state, todos };
        }
        default: {
            return state;
        }
    }
};

export default Reducer;