import { AnyAction } from 'redux';
import { ActionTypes } from '../../ActionTypes';

interface LayoutReducer {
    numberOfDrones?: number;
    targetsFile?: File;
}

const INITIAL_STATE: LayoutReducer = {
    numberOfDrones: undefined,
    targetsFile: undefined,
};

/* Reducer for the layout */
export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    /* Update the number of drones */
    case ActionTypes.UI.UPDATE_NUMBER_OF_DRONES: {
      const numberOfDrones: number | undefined = action.payload.numberOfDrones;
      return { ...state, numberOfDrones };
    }
    /* Update the targets file */
    case ActionTypes.UI.UPDATE_TARGETS_FILE: {
      const targetsFile: File | undefined = action.payload.targetsFile;
      return { ...state, targetsFile };
    }
    /* Default */
    default: {
      return { ...state };
    }
  }
};
