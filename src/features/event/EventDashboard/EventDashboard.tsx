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
  host: string;
  hostPhotoURL: string;
  attendees: Attendee[];
}

interface State {
  isFormOpen: boolean;
  events: Event[];
  selectedEvent: Event | null;
}

const eventsFromDashboard: Event[] = [
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

export class EventDashboard extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFormOpen: false,
      events: eventsFromDashboard,
      selectedEvent: null
    };
  }

  handleFormToggle = (): void => {
    this.setState(prevState => ({
      isFormOpen: !prevState.isFormOpen
    }));
  };

  handleAddEvent = (newEvent: any): void => {
    newEvent.attendees = [];
    newEvent.id = Math.floor(Math.random() * 10000).toString();
    newEvent.category = 'xyz';
    newEvent.hostPhotoURL = 'https://randomuser.me/api/portraits/men/2.jpg';
    // newEvent.host = 'me';
    this.setState(prevState => ({
      events: [...prevState.events, newEvent]
    }));
  };

  handleUpdateEvent = (updatedEvent: any): void => {
    this.setState(prevState => {
      return {
        events: prevState.events.map(event => {
          if (event.id === updatedEvent.id) {
            return { ...event, ...updatedEvent };
          }
          return event;
        }),
        selectedEvent: null,
        isFormOpen: false
      };
    });
  };

  handleDeleteEvent = (eventId: string): void => {
    this.setState(prevState => {
      return {
        events: prevState.events.filter(event => {
          if (event.id === eventId) return false;
          return true;
        }),
        selectedEvent: null,
        isFormOpen: false
      };
    });
  };

  handleSelectEvent = (event: Event): void => {
    this.setState({ selectedEvent: event, isFormOpen: true });
  };

  openCreateEventForm = (): void => {
    this.setState({ selectedEvent: null, isFormOpen: true });
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          {this.state.events.map(event => (
            <EventListItem
              key={event.id}
              event={event}
              handleSelectEvent={this.handleSelectEvent}
              handleDeleteEvent={this.handleDeleteEvent}
            />
          ))}
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive onClick={this.openCreateEventForm}>
            Create Event
          </Button>
          {this.state.isFormOpen && (
            <EventForm
              key={
                this.state.selectedEvent
                  ? this.state.selectedEvent.id
                  : 'addNewEvent'
              }
              handleAddEvent={this.handleAddEvent}
              handleFormToggle={this.handleFormToggle}
              selectedEvent={this.state.selectedEvent}
              handleUpdateEvent={this.handleUpdateEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
