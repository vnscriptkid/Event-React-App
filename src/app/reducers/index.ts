import { combineReducers } from 'redux';
import { testReducer } from '../../features/test/testReducer';

export interface ReduxStore {
  counter: number;
}

export const rootReducer = combineReducers<ReduxStore>({
  counter: testReducer
});
