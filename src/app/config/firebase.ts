import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from '../../config';
import { ReactReduxFirebaseConfig } from 'react-redux-firebase';

export const rrfConfig: Partial<ReactReduxFirebaseConfig> = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export { firebase };
