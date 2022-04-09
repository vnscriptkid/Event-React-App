import { combineReducers } from "redux";
import { testReducer } from "../../features/test/testReducer";
import { eventReducer } from "../../features/event/eventReducer";
import { Event } from "../../features/event/eventContants";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import { modalReducer } from "../../features/modals/modalReducer";
import { authReducer } from "../../features/auth/authReducer";
import { asyncReducer } from "../../features/async/asyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export interface StoreState {
  counter: number;
  events: Event[];
  form: any;
  modals: any;
  auth: any;
  async: any;
  toastr: any;
  firebase: any;
  firestore: any;
}

export const rootReducer = combineReducers<StoreState>({
  counter: testReducer,
  events: eventReducer,
  form: formReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer as any,
});
