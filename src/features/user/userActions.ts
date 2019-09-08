// import firebase, { firestore } from 'firebase';
import { firebase } from '../../app/config/firebase';
import { reset, SubmissionError } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { UserProfile } from './userConstants';
import { Dispatch } from 'react';
import {
  startAsyncAction,
  finishAsyncAction,
  errorAsyncAction
} from '../async/asyncActions';
const { firestore } = firebase;

// Update Profile
export const updateProfile = (profile: Partial<UserProfile>) => {
  return async (dispatch: any) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;
    if (firestore) {
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

export const updateUserImage = (image: any, imageName: string) => {
  return async (dispatch: Dispatch<any>, ...rest: any) => {
    console.log(rest);
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;
    const path = `${currentUser.uid}/user_images`;
    dispatch(startAsyncAction());

    const imageName: string = `${currentUser.uid}_${Date.now()}.jpeg`;

    try {
      // save image to storage storage/uid/user_images/name.jpeg (multiple images possible)
      const imageRef = await firebase
        .storage()
        .ref(path)
        .child(imageName);
      const uploadedImage = await imageRef.put(image);
      // const downloadURL = await uploadedImage.ref.getDownloadURL();

      // save imageURL to firebase and firestore in case he doesn't have one (main photo)
      const userRef = firestore()
        .collection(`users`)
        .doc(`${currentUser.uid}`);
      const downloadURL = await uploadedImage.ref.getDownloadURL();

      const userDoc = await userRef.get();
      const userData = userDoc.data();
      if (!userData || !userData.photoURL) {
        // update in firebase auth
        await currentUser.updateProfile({
          photoURL: downloadURL
        });
        // update in firestore
        await userRef.update({
          photoURL: downloadURL
        });
      }

      // save imageURL to photos collection of the user
      await firestore()
        .collection(`users`)
        .doc(`${currentUser.uid}`)
        .collection(`photos`)
        .add({
          name: imageName,
          url: downloadURL
        });
      dispatch(finishAsyncAction());
    } catch (e) {
      // bubble up the error
      dispatch(errorAsyncAction());
      throw new Error(e);
    }
  };
};
