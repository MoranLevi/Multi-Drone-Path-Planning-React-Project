import { combineReducers } from 'redux';
import LayoutReducer from './ui/LayoutReducer';

const rootReducer = combineReducers({
    ui: combineReducers({
        layout: LayoutReducer,
    }),
});

export default rootReducer;
