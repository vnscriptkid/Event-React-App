import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventListItem from '../EventList/EventListItem';
import EventForm from '../EventForm.tsx/EventForm';
import { Event } from '../eventContants';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { deleteEvent, createEvent, updateEvent } from '../eventActions';

interface State {
  isFormOpen: boolean;
  selectedEvent: Event | null;
}

interface Props {
  events: Event[];
  deleteEvent: typeof deleteEvent;
  createEvent: typeof createEvent;
  updateEvent: typeof updateEvent;
}

export class _EventDashboard extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFormOpen: false,
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
    this.props.createEvent(newEvent);
  };

  handleUpdateEvent = (updatedEvent: any): void => {
    this.props.updateEvent(updatedEvent.id, updatedEvent);
    this.setState(prevState => {
      return {
        selectedEvent: null,
        isFormOpen: false
      };
    });
  };

  handleDeleteEvent = (eventId: string): void => {
    this.props.deleteEvent(eventId);
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
          {this.props.events.map(event => (
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

const mapStateToProps = (state: StoreState) => ({
  events: state.events
});

export const EventDashboard = connect(
  mapStateToProps,
  { deleteEvent, createEvent, updateEvent }
)(_EventDashboard);
