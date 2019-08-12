import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventListItem from '../EventList/EventListItem';
import { Event } from '../eventContants';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { deleteEvent, createEvent, updateEvent } from '../eventActions';
import { Loading } from '../../../app/layout/Loading';
import { EventActivity } from '../EventActivity/EventActivity';

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
          {this.props.events.map(event => (
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
  events: state.events,
  loading: state.async.loading
});

export const EventDashboard = connect(
  mapStateToProps,
  { deleteEvent, createEvent, updateEvent }
)(_EventDashboard);
