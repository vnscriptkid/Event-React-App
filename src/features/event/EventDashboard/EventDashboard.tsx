import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventListItem from '../EventList/EventListItem';
import { Event } from '../eventContants';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { deleteEvent, createEvent, updateEvent } from '../eventActions';
import { Loading } from '../../../app/layout/Loading';
import { EventActivity } from '../EventActivity/EventActivity';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

interface Props {
  events: Event[];
  loading: boolean;
  deleteEvent: typeof deleteEvent;
  createEvent: typeof createEvent;
  updateEvent: typeof updateEvent;
}

export class _EventDashboard extends Component<Props, {}> {
  render() {
    if (this.props.loading) return <Loading />;
    return (
      <Grid>
        <Grid.Column width={10}>
          {this.props.events &&
            this.props.events.map(event => (
              <EventListItem key={event.id} event={event} />
            ))}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  // events: state.events,
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

export const EventDashboard = compose(
  firestoreConnect(() => ['events']),
  connect(mapStateToProps)
)(_EventDashboard);

// export const EventDashboard = connect(
//   mapStateToProps,
//   { deleteEvent, createEvent, updateEvent }
// )(_EventDashboard);

// export const EventDashboard = connect(
//   mapStateToProps,
//   { deleteEvent, createEvent, updateEvent }
// )(_EventDashboard);
