import * as React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';

export interface EventDetailedInfoProps {
  description: string;
  venue: string;
  date: string;
}

const EventDetailedInfo: React.SFC<EventDetailedInfoProps> = props => {
  const { description, venue, date } = props;
  return (
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='calendar' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{date}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='map pin' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{venue}</span>
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
