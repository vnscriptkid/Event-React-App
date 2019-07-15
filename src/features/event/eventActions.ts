import { EventTypes, Event } from './eventContants';

export interface CreateEventAction {
  type: EventTypes.CreateEvent;
  payload: Event;
}

export const createEvent = (event: Event): CreateEventAction => ({
  type: EventTypes.CreateEvent,
  payload: event
});

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
  | DeleteEventAction;
