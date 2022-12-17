import { AppThunk } from '../store';
import { ActionTypes } from '../ActionTypes';
import { LoggerFactory } from '../../logger';
import { AppPackageName } from 'src/constants';


export const CounterActions = {
    increaseCounter: (): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.COUNTER)
        LOG.debug('increaseCounter')

        dispatch({
            type: ActionTypes.SET_COUNTER,
            payload: { count: getState().counter.count + 1 },
        });
    },
    decreaseCounter: (): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.COUNTER)
        LOG.debug('decreaseCounter')

        dispatch({
            type: ActionTypes.SET_COUNTER,
            payload: { count: getState().counter.count - 1 },
        });
    },
};
