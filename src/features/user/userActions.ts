import { FirebaseProfile } from '../auth/authConstants';
import firebase, { firestore } from 'firebase';
import { reset, SubmissionError } from 'redux-form';
import { toastr } from 'react-redux-toastr';

// Update Profile
export const updateProfile = (profile: Partial<FirebaseProfile>) => {
  return async (dispatch: any) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser && firestore) {
      try {
        await firestore()
          .collection(`users`)
          .doc(`${currentUser.uid}`)
          .update({
            ...profile
          });
        await dispatch(reset('account'));
        toastr.success('Success', 'Your profile has been updated');
      } catch (e) {
        throw new SubmissionError({
          _error: e.message
        });
      }
    }
  };
};
