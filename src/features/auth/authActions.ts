import { AuthActionType } from './authConstants';

// Login User
export interface LoginUser {
  type: AuthActionType.LoginUser;
  payload: {
    creds: {
      email: string;
    };
  };
}

export const loginUser = (email: string): LoginUser => ({
  type: AuthActionType.LoginUser,
  payload: {
    creds: {
      email
    }
  }
});

// Sign out User
export interface SignoutUser {
  type: AuthActionType.SignoutUser;
}

export const signoutUser = (): SignoutUser => ({
  type: AuthActionType.SignoutUser
});

// Auth Action
export type AuthAction = LoginUser | SignoutUser;
