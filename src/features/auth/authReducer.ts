import { AuthAction } from './authActions';
import { AuthActionType } from './authConstants';

const initialState = {
  isAuthenticated: false,
  currentUser: null
};
export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.LoginUser:
      return {
        isAuthenticated: true,
        currentUser: action.payload.creds.email
      };
    case AuthActionType.SignoutUser:
      return {
        isAuthenticated: false,
        currentUser: null
      };
  }
  return state;
};
