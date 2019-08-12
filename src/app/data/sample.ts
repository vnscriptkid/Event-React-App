import { Event } from '../../features/event/eventContants';

export const sampleData: Event[] = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2019-07-14T18:00:00', //yyyy-MM-dd
    category: 'Culture',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam optio quasi, est dolorem quo in quisquam sapiente, praesentium laboriosam voluptatum illo corrupti suscipit recusandae totam, voluptatem neque voluptate aut eum.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    venueLatLng: {
      lat: 21.0245,
      lng: 105.84117
    },
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
    date: '2019-08-20T23:30:00',
    category: 'Nature',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam optio quasi, est dolorem quo in quisquam sapiente, praesentium laboriosam voluptatum illo corrupti suscipit recusandae totam, voluptatem neque voluptate aut eum.',
    city: 'Hanoi, Vietnam',
    venue: 'Sword Lake',
    venueLatLng: {
      lat: 51.3,
      lng: 0.4
    },
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
