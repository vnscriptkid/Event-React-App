import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export interface EventActivityProps {}

const EventActivity: React.SFC<EventActivityProps> = () => {
  return (
    <React.Fragment>
      <Header attached='top' content='Recent Activity' />
      <Segment attached>
        <p>Recent activites</p>
      </Segment>
    </React.Fragment>
  );
};

export { EventActivity };
