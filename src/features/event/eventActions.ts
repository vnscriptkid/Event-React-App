import { EventTypes, Event } from './eventContants';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  startAsyncAction,
  finishAsyncAction,
  errorAsyncAction
} from '../async/asyncActions';
import { fetchEventsFromApi } from '../../app/data/eventsApi';
import { toastr } from 'react-redux-toastr';
import { firebase } from '../../app/config/firebase';
import { Dispatch } from 'react';
const { firestore } = firebase;

// Fetch Event Async
export const fetchEvents = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(startAsyncAction());
    try {
      const events: Event[] = await fetchEventsFromApi();
      dispatch(saveEvents(events));
      dispatch(finishAsyncAction());
    } catch (e) {
      dispatch(errorAsyncAction());
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

// Delete Event
export interface DeleteEventAction {
  type: EventTypes.DeleteEvent;
  payload: string;
}

export const deleteEvent = (eventId: string): DeleteEventAction => ({
  type: EventTypes.DeleteEvent,
  payload: eventId
});

export type EventAction =
  | CreateEventAction
  | UpdateEventAction
  | DeleteEventAction
  | SaveEventsAction;
