import { AuthActionType, AuthProviderOption } from "./authConstants";
import { firebase } from "../../app/config/firebase";
import { closeModal } from "../modals/modalActions";
import { SubmissionError, reset } from "redux-form";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { UserCredential } from "@firebase/auth-types";
import { toastr } from "react-redux-toastr";
const { firestore } = firebase;

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
      email,
    },
  },
});

export const loginUser = (creds: { email: string; password: string }): any => {
  return async (dispatch: any) => {
    try {
      const { email, password } = creds;
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(closeModal());
    } catch (e) {
      throw new SubmissionError({
        _error: e.message,
      });
    }
  };
};

const _authProviderMap = (
  providerName: AuthProviderOption
): firebase.auth.AuthProvider => {
  if (providerName === AuthProviderOption.Facebook) {
    return new firebase.auth.FacebookAuthProvider();
  }
  return new firebase.auth.GoogleAuthProvider();
};

// Test user Facebook: open_fmqheee_user@tfbnw.net
export const socialLogin = (providerName: AuthProviderOption): any => {
  return async (dispatch: any) => {
    dispatch(closeModal());
    try {
      const provider = _authProviderMap(providerName);
      const user = await firebase.auth().signInWithPopup(provider);
      if (
        firestore &&
        user.user &&
        user.additionalUserInfo &&
        user.additionalUserInfo.isNewUser
      ) {
        await firestore().collection(`users`).doc(`${user.user.uid}`).set({
          displayName: user.user.displayName,
          photoURL: user.user.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// Sign out User
export interface SignoutUser {
  type: AuthActionType.SignoutUser;
}

export const signoutUser = (): SignoutUser => ({
  type: AuthActionType.SignoutUser,
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
      if (createdUser.user) {
        await createdUser.user.updateProfile({ displayName });
        const newUser = {
          displayName,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
        await firestore()
          .collection(`users`)
          .doc(`${createdUser.user.uid}`)
          .set({
            ...newUser,
          });
        dispatch(closeModal());
      }
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  };
};

// Update Password
export const updatePassword = (creds: any) => {
  return async (dispatch: any) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      try {
        await currentUser.updatePassword(creds.NewPassword);
        await dispatch(reset("account"));
        toastr.success("Success", "Your password has been updated");
      } catch (e) {
        throw new SubmissionError({
          _error: e.message,
        });
      }
    }
  };
};

// Auth Action
export type AuthAction = LoginUser | SignoutUser;
