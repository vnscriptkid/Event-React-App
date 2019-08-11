import { AsyncAction } from './asyncActions';
import { AsyncActionType } from './asyncConstants';

const initialState = {
  loading: false
};

export const asyncReducer = (state = initialState, action: AsyncAction) => {
  switch (action.type) {
    case AsyncActionType.Start:
      return {
        ...state,
        loading: true
      };
    case AsyncActionType.Finish:
      return {
        ...state,
        loading: false
      };
    case AsyncActionType.Error:
      return {
        ...state,
        loading: false
      };
  }
  return state;
};
