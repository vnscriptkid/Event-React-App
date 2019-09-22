import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventListItem from '../EventList/EventListItem';
import { Event } from '../eventContants';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { Loading } from '../../../app/layout/Loading';
import { EventActivity } from '../EventActivity/EventActivity';
import { getEventsForDashboard } from '../eventActions';
import { toastr } from 'react-redux-toastr';
import { createAsyncId } from '../../async/asyncReducer';
import { AsyncActionName } from '../../async/asyncConstants';

interface Props {
  events: Event[];
  loading: boolean;
  getEventsForDashboard: typeof getEventsForDashboard;
}

export class _EventDashboard extends Component<Props, {}> {
  async componentDidMount() {
    try {
      await this.props.getEventsForDashboard();
    } catch (e) {
      toastr.error('Oooops', 'Can not fetch events');
    }
  }

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

const mapStateToProps = (state: StoreState) => {
  const eventLoadingId = createAsyncId({
    actionName: AsyncActionName.FetchEvents
  });
  const eventloadingState =
    state.async[eventLoadingId] && state.async[eventLoadingId].loading;
  return {
    events: state.events,
    loading: eventloadingState
  };
};

const actions = {
  getEventsForDashboard
};

export const EventDashboard = connect(
  mapStateToProps,
  actions
)(_EventDashboard as any);
