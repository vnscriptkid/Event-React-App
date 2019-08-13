import { AuthActionType } from './authConstants';
import { firebase } from '../../app/config/firebase';
import { closeModal } from '../modals/modalActions';
import { SubmissionError } from 'redux-form';

// Login User
export interface LoginUser {
  type: AuthActionType.LoginUser;
  payload: {
    creds: {
      email: string;
    };
  };
}

export const _loginUser = (email: string): LoginUser => ({
  type: AuthActionType.LoginUser,
  payload: {
    creds: {
      email
    }
  }
});

export const loginUser = (creds: { email: string; password: string }): any => {
  return async (dispatch: any) => {
    try {
      const { email, password } = creds;
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(closeModal());
    } catch (e) {
      // console.log(e);
      throw new SubmissionError({
        _error: e.message
      });
    }
  };
};

// Sign out User
export interface SignoutUser {
  type: AuthActionType.SignoutUser;
}

export const signoutUser = (): SignoutUser => ({
  type: AuthActionType.SignoutUser
});

// Auth Action
export type AuthAction = LoginUser | SignoutUser;
