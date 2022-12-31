import { AppThunk } from '../store';
import { ActionTypes } from '../ActionTypes';
import { LoggerFactory } from 'src/logger';
import { AppPackageName } from 'src/constants';

export const UIActions = {
    updateNumberOfDrones: (newNumberOfDrones: number | undefined): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.UI_ACTIONS);
        LOG.debug('updateNumberOfDrones:', { newNumberOfDrones });

        dispatch({
            type:  ActionTypes.UI.UPDATE_NUMBER_OF_DRONES,
            payload:  { numberOfDrones: newNumberOfDrones }
        });
    },
};
