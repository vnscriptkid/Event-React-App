import { CounterTypes } from './testReducer';

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
