import React from 'react';
import { Grid } from 'semantic-ui-react';
import { EventDetailedHeader } from './EventDetailedHeader';
import { EventDetailedInfo } from './EventDetailedInfo';
import { EventDetailedChat } from './EventDetailedChat';
import { EventDetailedSidebar } from './EventDetailedSidebar';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { RouteComponentProps } from 'react-router';
import { Event } from '../eventContants';
import { compose } from 'redux';
import {
  withFirestore,
  WithFirestoreProps,
  firebaseConnect
} from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
import { mergeKeyToObject } from '../../../app/common/utils/converter';
import {
  joinEventAsync,
  cancelGoingToEvent,
  addEventComment
} from '../eventActions';

export interface EventDetailedProps
  extends WithFirestoreProps,
    RouteComponentProps {
  event: Event;
  eventId: string;
  auth: any;
  joinEventAsync: typeof joinEventAsync;
  cancelGoingToEvent: typeof cancelGoingToEvent;
  addEventComment: typeof addEventComment;
}

export interface EventDetailedState {}

type Params = { id: string };

class _EventDetailed extends React.Component<
  EventDetailedProps,
  EventDetailedState
> {
  async componentDidMount() {
    const { firestore, eventId, history } = this.props;
    try {
      await firestore.setListener({
        collection: `events`,
        doc: eventId
      });
    } catch (e) {
      toastr.error('Oooops!', e.message);
      history.push(`/events`);
    }
  }

  componentWillUnmount() {
    this.props.firestore.unsetListener({
      collection: `events`,
      doc: this.props.eventId
    });
  }

  render() {
    const {
      event,
      auth,
      joinEventAsync,
      cancelGoingToEvent,
      addEventComment
    } = this.props;
    let { attendees = {}, hostUid = null } = event || {};
    const attendeesArr = mergeKeyToObject(attendees);
    const isHost = auth.uid === hostUid;
    const isGoing = attendeesArr.some(a => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={this.props.event}
            isHost={isHost}
            isGoing={isGoing}
            joinEventAsync={joinEventAsync}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventDetailedInfo event={this.props.event} />
          <EventDetailedChat
            addEventComment={addEventComment}
            eventId={event && (event.id as string)}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendeesArr as any} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
  ownProps: RouteComponentProps<Params>
) => {
  const { events = [] } = state.firestore.ordered;
  const eventId = ownProps.match.params.id;
  let event = null;

  if (events.length > 0) {
    event = events.find((event: any) => event.id === eventId);
  }

  return { event, eventId, auth: state.firebase.auth };
};

const actions = {
  joinEventAsync: joinEventAsync,
  cancelGoingToEvent: cancelGoingToEvent,
  addEventComment: addEventComment
};

export const EventDetailed = compose(
  connect(
    mapStateToProps,
    actions
  ),
  withFirestore,
  firebaseConnect((props: RouteComponentProps<Params>) => [
    `event_chat/${props.match.params.id}`
  ])
)(_EventDetailed);
