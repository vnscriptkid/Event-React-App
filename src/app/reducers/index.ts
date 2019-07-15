import { combineReducers } from 'redux';
import { testReducer } from '../../features/test/testReducer';
import { eventReducer } from '../../features/event/eventReducer';
import { Event } from '../../features/event/eventContants';

export interface StoreState {
  counter: number;
  events: Event[];
}

export const rootReducer = combineReducers<StoreState>({
  counter: testReducer,
  events: eventReducer
});
