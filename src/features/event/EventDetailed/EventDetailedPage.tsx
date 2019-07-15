import React from 'react';
import { Grid } from 'semantic-ui-react';
import { EventDetailedHeader } from './EventDetailedHeader';
import { EventDetailedInfo } from './EventDetailedInfo';
import { EventDetailedChat } from './EventDetailedChat';
import { EventDetailedSidebar } from './EventDetailedSidebar';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { RouteComponentProps } from 'react-router';

export interface EventDetailedProps {}

const _EventDetailed: React.SFC<EventDetailedProps> = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader />
        <EventDetailedInfo />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

type Params = { id: string };

const mapStateToProps = (
  state: StoreState,
  ownProps: RouteComponentProps<Params>
) => ({
  event: state.events.find(event => event.id === ownProps.match.params.id)
});

export const EventDetailed = connect(mapStateToProps)(_EventDetailed);
