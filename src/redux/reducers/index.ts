import { combineReducers } from 'redux';
import counterReducer from './ui/CounterReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;
