import { AppThunk } from '../store';
import { ActionTypes } from '../ActionTypes';
import { LoggerFactory } from '../../logger';
import { AppPackageName } from 'src/constants/AppPackageName';
import { ETodoItemStatus } from '../../data-structures/ETodoItemStatus';
import { ITodoItem } from 'src/interfaces/ITodoItem';

const PrivateTodoActions = {
    updateTodos: (todos: ITodoItem[]): AppThunk => (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TODO.DATA.SET_TODOS,
            payload: { todos },
        });

        const unTrashedTodos = todos.filter(todo => todo.status !== ETodoItemStatus.IN_TRASH);

        dispatch({
            type: ActionTypes.TODO.UI.SET_TODOS,
            payload: { todos: unTrashedTodos },
        });
    }
}

export const TodoActions = {
    addTodoItem: (body: string): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.TODO)
        LOG.debug(`addTodoItem()`, { body });

        const { todos } = getState().todo.data;

        dispatch(PrivateTodoActions.updateTodos([...todos, { id: todos.length, body, status: ETodoItemStatus.UN_MARKED } ]));
    },
    updateTodoItemStatus: (id: number, status: ETodoItemStatus): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.TODO)
        LOG.debug(`updateTodoItemStatus()`, { id, status });

        const { todos } = getState().todo.data;

        dispatch(PrivateTodoActions.updateTodos(todos.map((todo) => todo.id === id ? { ...todo, status } : todo)));
    },
    restoreFromTrash: (): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.TODO)
        LOG.debug(`restoreFromTrash()`);

        const { todos } = getState().todo.data;

        dispatch(PrivateTodoActions.updateTodos(todos.map((todo) => {
            return { 
                ...todo, 
                status: todo.status === ETodoItemStatus.IN_TRASH ? ETodoItemStatus.UN_MARKED : todo.status 
            };
        })));
    },
};
