import * as React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';

export interface EventDetailedInfoProps {}

const EventDetailedInfo: React.SFC<EventDetailedInfoProps> = () => {
  return (
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>Description of Event</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='calendar' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>Event Date</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='map pin' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>Event Venue</span>
            <Button color='teal' floated='right'>
              Show Map
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedInfo };
