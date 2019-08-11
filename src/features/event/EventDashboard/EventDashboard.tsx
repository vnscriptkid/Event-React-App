import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventListItem from '../EventList/EventListItem';
import { Event } from '../eventContants';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { deleteEvent, createEvent, updateEvent } from '../eventActions';
import { Loading } from '../../../app/layout/Loading';

interface Props {
  events: Event[];
  loading: boolean;
  deleteEvent: typeof deleteEvent;
  createEvent: typeof createEvent;
  updateEvent: typeof updateEvent;
}

export class _EventDashboard extends Component<Props, {}> {
  // handleAddEvent = (newEvent: any): void => {
  //   newEvent.attendees = [];
  //   newEvent.id = Math.floor(Math.random() * 10000).toString();
  //   newEvent.category = 'xyz';
  //   newEvent.hostPhotoURL = 'https://randomuser.me/api/portraits/men/2.jpg';
  //   this.props.createEvent(newEvent);
  // };

  // handleUpdateEvent = (updatedEvent: any): void => {
  //   this.props.updateEvent(updatedEvent.id, updatedEvent);
  //   this.setState(prevState => {
  //     return {
  //       selectedEvent: null,
  //       isFormOpen: false
  //     };
  //   });
  // };

  // handleDeleteEvent = (eventId: string): void => {
  //   this.props.deleteEvent(eventId);
  // };

  // handleSelectEvent = (event: Event): void => {
  //   this.setState({ selectedEvent: event, isFormOpen: true });
  // };

  render() {
    if (this.props.loading) return <Loading />;
    return (
      <Grid>
        <Grid.Column width={10}>
          {this.props.events.map(event => (
            <EventListItem key={event.id} event={event} />
          ))}
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Navbar</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  events: state.events,
  loading: state.async.loading
});

export const EventDashboard = connect(
  mapStateToProps,
  { deleteEvent, createEvent, updateEvent }
)(_EventDashboard);
