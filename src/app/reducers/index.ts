import { combineReducers } from 'redux';
import { testReducer } from '../../features/test/testReducer';
import { eventReducer } from '../../features/event/eventReducer';
import { Event } from '../../features/event/eventContants';
import { reducer as formReducer } from 'redux-form';

export interface StoreState {
  counter: number;
  events: Event[];
  form: any;
}

export const rootReducer = combineReducers<StoreState>({
  counter: testReducer,
  events: eventReducer,
  form: formReducer
});
