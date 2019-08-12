import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from '../../config';

export const rrfConfig = {
  userProfiles: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export { firebase };
