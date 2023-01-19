import { combineReducers } from 'redux';
import LayoutReducer from './ui/LayoutReducer';

/* Root reducer */
const rootReducer = combineReducers({
    ui: combineReducers({
        layout: LayoutReducer,
    }),
});

export default rootReducer;
