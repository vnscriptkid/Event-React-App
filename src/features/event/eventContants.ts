export enum EventTypes {
  CreateEvent,
  DeleteEvent,
  UpdateEvent,
  FetchEvents,
  SaveEvents
}

export interface Attendee {
  id: string;
  name: string;
  photoURL: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  venueLatLng: google.maps.LatLngLiteral;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Attendee[];
}
