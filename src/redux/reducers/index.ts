import { combineReducers } from 'redux';

import TodoReducer from './data/TodoReducer';

import TodoContainer from './ui/TodoContainer';

const rootReducer = combineReducers({
    todo: combineReducers({
        data: TodoReducer,
        ui: TodoContainer
    }),
});

export default rootReducer;
