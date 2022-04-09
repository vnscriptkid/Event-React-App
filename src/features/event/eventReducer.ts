import { Event, EventTypes } from "./eventContants";
import { EventAction } from "./eventActions";

const initialState: Event[] = [];

export const eventReducer = (
  state: Event[] = initialState,
  action: EventAction
) => {
  switch (action.type) {
    case EventTypes.CreateEvent:
      return [...state, action.payload];
    case EventTypes.UpdateEvent:
      return state.map((event) => {
        if (event.id === action.payload.id) {
          return { ...event, ...action.payload.data };
        }
        return event;
      });
    case EventTypes.DeleteEvent:
      return state.filter((event) => event.id !== action.payload);
    case EventTypes.SaveEvents:
      return [...action.payload];
    default:
      return state;
  }
};
