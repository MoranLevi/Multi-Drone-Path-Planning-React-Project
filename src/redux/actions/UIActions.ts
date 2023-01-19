import { AppThunk } from '../store';
import { ActionTypes } from '../ActionTypes';
import { LoggerFactory } from 'src/logger';
import { AppPackageName } from 'src/constants';

/* Actions for the UI */
export const UIActions = {
    /* Update the number of drones */
    updateNumberOfDrones: (newNumberOfDrones: number | undefined): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.UI_ACTIONS);
        LOG.debug('updateNumberOfDrones:', { newNumberOfDrones });

        dispatch({
            type:  ActionTypes.UI.UPDATE_NUMBER_OF_DRONES,
            payload:  { numberOfDrones: newNumberOfDrones }
        });
    },
    /* Update the targets file */
    updateTargetsFile: (newTargetsFile: File | undefined): AppThunk => (dispatch, getState) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.ACTIONS.UI_ACTIONS);
        LOG.debug('updateTargetsFile');

        dispatch({
            type:  ActionTypes.UI.UPDATE_TARGETS_FILE,
            payload:  { targetsFile: newTargetsFile }
        });
    },
};
