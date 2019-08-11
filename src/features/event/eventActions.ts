import { EventTypes, Event } from './eventContants';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  startAsyncAction,
  finishAsyncAction,
  errorAsyncAction
} from '../async/asyncActions';
import { fetchEventsFromApi } from '../../app/data/eventsApi';

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

// Update Event
export interface UpdateEventAction {
  type: EventTypes.UpdateEvent;
  payload: {
    id: string;
    data: any;
  };
}

export const updateEvent = (id: string, data: Event): UpdateEventAction => ({
  type: EventTypes.UpdateEvent,
  payload: {
    id,
    data
  }
});

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
