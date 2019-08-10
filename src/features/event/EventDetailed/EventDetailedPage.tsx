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

export interface EventDetailedProps {
  event: Event;
}

const _EventDetailed: React.SFC<EventDetailedProps> = props => {
  const {
    title,
    date,
    host,
    description,
    venue,
    attendees,
    id,
    venueLatLng
  } = props.event;
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader id={id} title={title} date={date} host={host} />
        <EventDetailedInfo
          description={description}
          venue={venue}
          date={date}
          venueLatLng={venueLatLng}
        />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={attendees} />
      </Grid.Column>
    </Grid>
  );
};

type Params = { id: string };

const mapStateToProps = (
  state: StoreState,
  ownProps: RouteComponentProps<Params>
) => ({
  event: state.events.find(
    event => event.id === ownProps.match.params.id
  ) as Event
});

export const EventDetailed = connect(mapStateToProps)(_EventDetailed);
