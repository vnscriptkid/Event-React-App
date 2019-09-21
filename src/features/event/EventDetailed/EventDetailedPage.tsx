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
import { withFirestore, WithFirestoreProps } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { mergeKeyToObject } from '../../../app/common/utils/converter';

export interface EventDetailedProps
  extends WithFirestoreProps,
    RouteComponentProps {
  event: Event;
  eventId: string;
  auth: any;
}

export interface EventDetailedState {}

type Params = { id: string };

class _EventDetailed extends React.Component<
  EventDetailedProps,
  EventDetailedState
> {
  async componentDidMount() {
    const { firestore, eventId } = this.props;
    try {
      const eventDoc: DocumentSnapshot = (await firestore.get(
        `events/${eventId}`
      )) as any;
      if (!eventDoc.exists) {
        throw new Error('Event not found');
      }
    } catch (e) {
      toastr.error('Oooops!', e.message);
    }
  }

  render() {
    const { event, auth } = this.props;
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
          />
          <EventDetailedInfo event={this.props.event} />
          <EventDetailedChat />
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

export const EventDetailed = compose(
  connect(mapStateToProps),
  withFirestore
)(_EventDetailed);
