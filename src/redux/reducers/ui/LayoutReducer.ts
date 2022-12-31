import { AnyAction } from 'redux';
import { ActionTypes } from '../../ActionTypes';

interface LayoutReducer {
    numberOfDrones?: number;
}

const INITIAL_STATE: LayoutReducer = {
    numberOfDrones: undefined,
};

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.UI.UPDATE_NUMBER_OF_DRONES: {
      const numberOfDrones: number | undefined = action.payload.numberOfDrones;
      return { ...state, numberOfDrones };
    }
    default: {
      return { ...state };
    }
  }
};
