import { FieldValue } from '@firebase/firestore-types';

export enum AuthActionType {
  LoginUser = 'LOGIN_USER',
  SignoutUser = 'SIGN_OUT_USER'
}

export enum AuthProviderOption {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE'
}

export interface FirebaseProfile {
  displayName: string;
  photoURL: string | undefined;
  createdAt: FieldValue;
  dateOfBirth?: number;
  homeTown?: string;
  gender?: string;
}

export enum ProviderName {
  Facebook = 'facebook.com',
  Google = 'google.com',
  Password = 'password'
}
