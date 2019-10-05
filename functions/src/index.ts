import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import {
  Activity,
  Event,
  ActivityType
} from '../../src/features/event/eventContants';
import { Timestamp } from '@firebase/firestore-types';

// get full rights to app
admin.initializeApp(functions.config().firebase);

export const addEventActivity = functions.firestore
  .document(`events/${event}`)
  .onCreate((event: DocumentSnapshot, context) => {
    const newEvent = event.data() as Event;
    console.log({ newEvent });
    const activity: Activity = {
      type: ActivityType.NewEvent,
      eventId: newEvent.id as string,
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
