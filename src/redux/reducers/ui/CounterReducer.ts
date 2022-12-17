import { AnyAction } from 'redux';
import { ActionTypes } from 'src/redux/ActionTypes';

interface CounterReducer {
    count: number;
}

const INITIAL_STATE: CounterReducer = {
    count: 0,
};

export default (state = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.SET_COUNTER: {
            const count: number = action.payload.count;
            return { ...state, count };
        }
        default: {
            return { ...state };
        }
    }
};
