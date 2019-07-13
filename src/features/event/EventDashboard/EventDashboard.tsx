import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventListItem from '../EventList/EventListItem';
import EventForm from '../EventForm.tsx/EventForm';

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
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Attendee[];
}

interface State {
  isFormOpen: boolean;
  events: Event[];
}

const eventsFromDashboard: Event[] = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: new Date().toString(),
    category: 'Culture',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam optio quasi, est dolorem quo in quisquam sapiente, praesentium laboriosam voluptatum illo corrupti suscipit recusandae totam, voluptatem neque voluptate aut eum.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
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
    date: new Date().toString(),
    category: 'Nature',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam optio quasi, est dolorem quo in quisquam sapiente, praesentium laboriosam voluptatum illo corrupti suscipit recusandae totam, voluptatem neque voluptate aut eum.',
    city: 'Hanoi, Vietnam',
    venue: 'Sword Lake',
    hostedBy: 'Lisa',
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

export class EventDashboard extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFormOpen: false,
      events: eventsFromDashboard
    };
  }

  handleFormToggle = () => {
    this.setState(prevState => ({
      isFormOpen: !prevState.isFormOpen
    }));
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          {this.state.events.map(event => (
            <EventListItem key={event.id} event={event} />
          ))}
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive onClick={this.handleFormToggle}>
            Create Event
          </Button>
          {this.state.isFormOpen && (
            <EventForm handleFormToggle={this.handleFormToggle} />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
