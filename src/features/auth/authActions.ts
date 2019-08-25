import { AuthActionType } from './authConstants';
import { firebase } from '../../app/config/firebase';
import { closeModal } from '../modals/modalActions';
import { SubmissionError } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UserCredential } from '@firebase/auth-types';

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

// register user
export const registerUser = (user: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const { email, password, displayName } = user;
    const { firestore } = firebase;
    try {
      const createdUser: UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(createdUser);
      if (createdUser.user) {
        await createdUser.user.updateProfile({ displayName });
        const newUser = {
          displayName,
          createdAt: firestore.FieldValue.serverTimestamp()
        };
        await firestore()
          .collection(`users`)
          .doc(`${createdUser.user.uid}`)
          .set({
            ...newUser
          });
        dispatch(closeModal());
      }
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  };
};

// Auth Action
export type AuthAction = LoginUser | SignoutUser;
