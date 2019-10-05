import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  Activity,
  Event,
  ActivityType
} from '../../src/features/event/eventContants';
import { Timestamp } from '@firebase/firestore-types';

// get full rights to app
admin.initializeApp(functions.config().firebase);

export const addEventActivity = functions.firestore
  .document(`events/{event}`)
  .onCreate((event, context) => {
    const newEvent = event.data() as Event;
    console.log({ newEvent });
    const activity: Activity = {
      type: ActivityType.NewEvent,
      eventId: event.id,
      hostUid: newEvent.hostUid as string,
      hostedBy: newEvent.hostedBy,
      photoURL: newEvent.hostPhotoURL,
      timestamp: admin.firestore.FieldValue.serverTimestamp() as Timestamp,
      title: newEvent.title
    };
    console.log({ activity });
    return admin
      .firestore()
      .collection(`activities`)
      .add(activity)
      .then(docRef => console.log({ docRef }))
      .catch(err => console.log({ err }));
  });

export const cancelledEventActivity = functions.firestore
  .document(`events/{event}`)
  .onUpdate((change, context) => {
    const oldEvent = change.before.data() as Event;
    const updatedEvent = change.after.data() as Event;
    if (!oldEvent || !updatedEvent) return false;
    if (oldEvent.cancelled || !updatedEvent.cancelled) return false;
    console.log({ updatedEvent });

    const activity: Activity = {
      type: ActivityType.CancelEvent,
      eventId: change.after.id,
      hostUid: updatedEvent.hostUid as string,
      hostedBy: updatedEvent.hostedBy,
      photoURL: updatedEvent.hostPhotoURL,
      timestamp: admin.firestore.FieldValue.serverTimestamp() as Timestamp,
      title: updatedEvent.title
    };

    console.log({ activity });
    return admin
      .firestore()
      .collection(`activities`)
      .add(activity)
      .then(docRef => console.log({ docRef }))
      .catch(err => console.log({ err }));
  });
