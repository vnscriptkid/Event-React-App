// import firebase, { firestore } from 'firebase';
import { firebase } from '../../app/config/firebase';
import { reset, SubmissionError } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { UserProfile } from './userConstants';
import { Dispatch } from 'react';
// import {
//   startAsyncAction,
//   finishAsyncAction,
//   errorAsyncAction
// } from '../async/asyncActions';
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
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;
    const path = `${currentUser.uid}/user_images`;
    // dispatch(startAsyncAction());

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
      // dispatch(finishAsyncAction());
    } catch (e) {
      // bubble up the error
      // dispatch(errorAsyncAction());
      throw new Error(e);
    }
  };
};

export const deleteImage = (photo: any) => {
  return async (dispatch: Dispatch<any>) => {
    const currentUser = firebase.auth().currentUser;
    const { name: photoName, id: photoId } = photo;
    if (!currentUser) throw new Error('Unauthenticated');
    if (!photoName || !photoId)
      throw new Error('photoName nad photoId is not available');

    try {
      // delete from storage /userId/user_images/imageName.jpeg
      await firebase
        .storage()
        .ref(`${currentUser.uid}/user_images`)
        .child(photoName)
        .delete();

      // delete from firestore /users/userId/photos/photoId
      await firestore()
        .collection(`users`)
        .doc(currentUser.uid)
        .collection(`photos`)
        .doc(photoId)
        .delete();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};

export const setMainPhoto = (photo: any) => {
  return async (dispatch: Dispatch<any>) => {
    // update photoURL in user doc\
    const currentUser = firebase.auth().currentUser;
    const { url: photoURL } = photo;
    if (!currentUser) throw new Error('Unauthenticated');
    if (!photoURL) throw new Error('photoURL is not available');
    try {
      // update in firestore (instant change)
      const userRef = firestore()
        .collection(`users`)
        .doc(currentUser.uid);
      await userRef.update({
        photoURL
      });
      // update in firebase auth (need reload to see the change)
      await currentUser.updateProfile({
        photoURL
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};
