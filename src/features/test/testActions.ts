import { CounterTypes } from './testReducer';
import { AnyAction } from 'redux';
import {
  startAsyncAction,
  finishAsyncAction,
  AsyncActionPayload
} from '../async/asyncActions';
import { delay } from 'q';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

export interface IncrementCounterAction {
  type: number;
}

export interface DecrementCounterAction {
  type: number;
}

export const incrementCounter = (): IncrementCounterAction => ({
  type: CounterTypes.INCREMENT
});

export const decrementCounter = (): DecrementCounterAction => ({
  type: CounterTypes.DECREMENT
});

export const incrementAsync = (
  payload: AsyncActionPayload
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(startAsyncAction(payload));
    await delay(2000);
    dispatch(incrementCounter());
    dispatch(finishAsyncAction(payload));
  };
};
