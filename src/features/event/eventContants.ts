export enum EventTypes {
  CreateEvent,
  DeleteEvent,
  UpdateEvent,
  FetchEvents,
  SaveEvents = 'SAVE_EVENTS'
}

export interface Attendee {
  id: string;
  displayName: string;
  photoURL: string;
}

export interface Event {
  id?: string;
  hostUid?: string;
  title: string;
  createdAt?: string;
  category: string;
  description: string;
  date: string;
  city: string;
  venue: string;
  venueLatLng: google.maps.LatLngLiteral;
  cityLatLng: google.maps.LatLngLiteral;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Attendee[];
  cancelled?: boolean;
}

export interface EventChat {
  date: number;
  displayName: string;
  id: string;
  photoURL: string;
  text: string;
  uid: string;
}
