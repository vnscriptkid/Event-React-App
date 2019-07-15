import { Event, EventTypes } from './eventContants';
import { EventAction } from './eventActions';

const initialState: Event[] = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2019-07-14', //yyyy-MM-dd
    category: 'Culture',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam optio quasi, est dolorem quo in quisquam sapiente, praesentium laboriosam voluptatum illo corrupti suscipit recusandae totam, voluptatem neque voluptate aut eum.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    host: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/women/19.jpg'
      },
      {
        id: 'b',
        name: 'Alcie',
        photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Wandering in Vietnam',
    date: '2019-08-20',
    category: 'Nature',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam optio quasi, est dolorem quo in quisquam sapiente, praesentium laboriosam voluptatum illo corrupti suscipit recusandae totam, voluptatem neque voluptate aut eum.',
    city: 'Hanoi, Vietnam',
    venue: 'Sword Lake',
    host: 'Lisa',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/22.jpg',
    attendees: [
      {
        id: 'c',
        name: 'John',
        photoURL: 'https://randomuser.me/api/portraits/women/19.jpg'
      },
      {
        id: 'd',
        name: 'Moses',
        photoURL: 'https://randomuser.me/api/portraits/men/15.jpg'
      }
    ]
  }
];

export const eventReducer = (
  state: Event[] = initialState,
  action: EventAction
) => {
  switch (action.type) {
    case EventTypes.CreateEvent:
      return [...state, action.payload];
    case EventTypes.UpdateEvent:
      return state.map(event => {
        if (event.id === action.payload.id) {
          return { ...event, ...action.payload.data };
        }
        return event;
      });
    case EventTypes.DeleteEvent:
      return state.filter(event => event.id !== action.payload);
    default:
      return state;
  }
};
