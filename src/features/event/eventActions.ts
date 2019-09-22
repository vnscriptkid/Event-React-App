import { EventTypes, Event } from './eventContants';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchEventsFromApi } from '../../app/data/eventsApi';
import { toastr } from 'react-redux-toastr';
import { firebase } from '../../app/config/firebase';
import { Dispatch } from 'react';
import {
  startAsyncAction,
  finishAsyncAction,
  errorAsyncAction
} from '../async/asyncActions';
import { AsyncActionName } from '../async/asyncConstants';
import { QueryDocumentSnapshot } from '@firebase/firestore-types';
const { firestore } = firebase;

// Fetch Event Async
export const fetchEvents = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const events: Event[] = await fetchEventsFromApi();
      dispatch(saveEvents(events));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getEventsForDashboard = (
  lastEvent?: { id: string },
  limit = 2
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const now = new Date();
      dispatch(startAsyncAction({ actionName: AsyncActionName.FetchEvents }));
      const eventsRef = await firestore().collection(`events`);

      let query;

      const startAfter = lastEvent && (await eventsRef.doc(lastEvent.id).get());

      lastEvent
        ? (query = await eventsRef
            .where('date', '>=', now)
            .orderBy('date')
            .startAfter(startAfter)
            .limit(limit))
        : (query = await eventsRef
            .where('date', '>=', now)
            .orderBy('date')
            .limit(limit));

      const eventSnapShot = await query.get();
      const eventDocs = eventSnapShot.docs;

      const events: Event[] = eventDocs.map(
        doc => ({ ...doc.data(), id: doc.id } as Event)
      );
      // save to store
      dispatch(saveEvents(events));
      dispatch(finishAsyncAction({ actionName: AsyncActionName.FetchEvents }));
    } catch (e) {
      console.log(e);
      dispatch(errorAsyncAction({ actionName: AsyncActionName.FetchEvents }));
      throw new Error(e);
    }
  };
};

// Save Events
export interface SaveEventsAction {
  type: EventTypes.SaveEvents;
  payload: Event[];
}

export const saveEvents = (events: Event[]): SaveEventsAction => ({
  type: EventTypes.SaveEvents,
  payload: events
});

// Create Event
export interface CreateEventAction {
  type: EventTypes.CreateEvent;
  payload: Event;
}

export const createEvent = (event: Event): CreateEventAction => ({
  type: EventTypes.CreateEvent,
  payload: event
});

function addEventProps(
  event: Partial<Event>,
  user: { displayName: string; photoURL: string; uid: string }
): any {
  const { displayName, photoURL, uid } = user;
  return {
    ...event,
    hostUid: uid,
    hostedBy: displayName,
    hostPhotoURL: photoURL,
    createdAt: firestore.FieldValue.serverTimestamp(),
    attendees: {
      [uid]: {
        going: true,
        joinDate: firestore.FieldValue.serverTimestamp(),
        photoURL: photoURL || '/assets/user.png',
        displayName,
        host: true
      }
    }
  };
}

export const createEventAsync = (event: Event) => {
  return async (dispatch: Dispatch<any>) => {
    const { currentUser } = firebase.auth();
    if (!currentUser) throw new Error('Unauthenticated user');
    try {
      // pre-process event
      const newEvent = addEventProps(event, currentUser as any);

      // create new event in firestore at path /events/eventid/event
      const eventDoc = await firestore()
        .collection(`events`)
        .add(newEvent);

      // save to look up table event_attendee (determine who attend what event)
      await firestore()
        .collection(`event_attendee`)
        .doc(`${eventDoc.id}_${currentUser.uid}`)
        .set({
          eventId: eventDoc.id,
          userId: currentUser.uid,
          eventDate: event.date,
          host: true
        });

      return eventDoc;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};

// Update Event
export interface UpdateEventAction {
  type: EventTypes.UpdateEvent;
  payload: {
    id: string;
    data: any;
  };
}

export const _updateEvent = (id: string, data: Event): UpdateEventAction => ({
  type: EventTypes.UpdateEvent,
  payload: {
    id,
    data
  }
});

export const updateEvent = (id: string, data: Event): any => {
  return async (dispatch: any) => {
    try {
      dispatch(_updateEvent(id, data));
      toastr.success('Success', 'Event has been updated');
    } catch (e) {
      toastr.error('Oooops!', 'Something went wrong');
    }
  };
};

export const updateEventAsync = (id: string, data: Partial<Event>): any => {
  return async (dispatch: any) => {
    try {
      await firestore()
        .collection(`events`)
        .doc(id)
        .update(data);
      toastr.success('Success', 'Event has been updated');
    } catch (e) {
      toastr.error('Oooops!', 'Something went wrong');
    }
  };
};

// cancel event async
export const toggleEventCancelAsync = (id: string, cancelled: boolean) => {
  return async (dispatch: any) => {
    try {
      await firestore()
        .collection(`events`)
        .doc(id)
        .update({
          cancelled
        });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};

// Delete Event
export interface DeleteEventAction {
  type: EventTypes.DeleteEvent;
  payload: string;
}

export const deleteEvent = (eventId: string): DeleteEventAction => ({
  type: EventTypes.DeleteEvent,
  payload: eventId
});

// Join an event
export const joinEventAsync = (event: Event) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) throw new Error('You are not authenticated');
      // add user current logged user to events/eventId/attendees
      await firestore()
        .collection(`events`)
        .doc(event.id)
        .update({
          [`attendees.${currentUser.uid}`]: {
            displayName: currentUser.displayName,
            going: true,
            host: false,
            joinDate: firestore.FieldValue.serverTimestamp(),
            photoURL: currentUser.photoURL || '/assets/user.png'
          }
        });

      // add a new record to event_attendee collection
      await firestore()
        .collection(`event_attendee`)
        .doc(`${event.id}_${currentUser.uid}`)
        .set({
          eventDate: event.date,
          eventId: event.id,
          host: false,
          userId: currentUser.uid
        });
    } catch (e) {
      throw new Error(e);
    }
  };
};

// cancel an event
export const cancelGoingToEvent = (event: Event) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) throw new Error('You are not authenticated');
      // remove current logged user from /events/eventId/attendees
      await firestore()
        .collection(`events`)
        .doc(event.id)
        .update({
          [`attendees.${currentUser.uid}`]: firestore.FieldValue.delete()
        });

      // remove one record from /event_attendee
      await firestore()
        .collection(`event_attendee`)
        .doc(`${event.id}_${currentUser.uid}`)
        .delete();
    } catch (e) {
      throw new Error(e);
    }
  };
};

export type EventAction =
  | CreateEventAction
  | UpdateEventAction
  | DeleteEventAction
  | SaveEventsAction;
