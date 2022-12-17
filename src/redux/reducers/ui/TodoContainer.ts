import { AnyAction } from 'redux';
import { ITodoItem } from 'src/interfaces/ITodoItem';
import { ActionTypes } from 'src/redux/ActionTypes';

interface TodoContainer {
    todos:          ITodoItem[]
}

const INITIAL_STATE: TodoContainer = {
    todos:          [],
};

const Reducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.TODO.UI.SET_TODOS: {
            const todos: ITodoItem[] = action.payload.todos;
            return { ...state, todos };
        }
        default: {
            return state;
        }
    }
};

export default Reducer;