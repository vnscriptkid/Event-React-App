import { combineReducers } from 'redux';
import { testReducer } from '../../features/test/testReducer';
import { eventReducer } from '../../features/event/eventReducer';
import { Event } from '../../features/event/eventContants';
import { reducer as formReducer } from 'redux-form';
import { modalReducer } from '../../features/modals/modalReducer';
import { authReducer } from '../../features/auth/authReducer';

export interface StoreState {
  counter: number;
  events: Event[];
  form: any;
  modals: any;
  auth: any;
}

export const rootReducer = combineReducers<StoreState>({
  counter: testReducer,
  events: eventReducer,
  form: formReducer,
  modals: modalReducer,
  auth: authReducer
});
