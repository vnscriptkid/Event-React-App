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
}

export interface EventDetailedState {}

type Params = { id: string };

class _EventDetailed extends React.Component<
  EventDetailedProps,
  EventDetailedState
> {
  async componentDidMount() {
    const {
      firestore,
      match: { params },
      event
    } = this.props;
    if (!event) {
      try {
        const eventId = (params as Params).id;
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
  }

  render() {
    let {
      title = '',
      hostedBy = '',
      description = '',
      venue = '',
      attendees = {},
      id = '',
      venueLatLng = undefined,
      date = ''
    } = this.props.event || {};
    attendees = mergeKeyToObject(attendees);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            id={id}
            title={title}
            date={date}
            host={hostedBy}
          />
          <EventDetailedInfo
            description={description}
            venue={venue}
            date={date}
            venueLatLng={venueLatLng}
          />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees as any} />
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
  let event = null;

  if (events.length > 0) {
    event = events.find((event: any) => event.id === ownProps.match.params.id);
  }

  return { event };
};

export const EventDetailed = compose(
  connect(mapStateToProps),
  withFirestore
)(_EventDetailed);
