import React, { useState } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { EventDetailedMap } from './EventDetailedMap';

export interface EventDetailedInfoProps {
  description: string;
  venue: string;
  date: string;
  venueLatLng: google.maps.LatLngLiteral;
}

const EventDetailedInfo: React.SFC<EventDetailedInfoProps> = props => {
  const [isMapOpen, toggleMap] = useState(false);
  const { description, venue, date, venueLatLng } = props;
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
      <Segment attached>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='map pin' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{venue}</span>
            <Button
              color='teal'
              floated='right'
              onClick={() => toggleMap(!isMapOpen)}
              content={isMapOpen ? 'Hide Map' : 'Show Map'}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && <EventDetailedMap latLng={venueLatLng} />}
    </Segment.Group>
  );
};

export { EventDetailedInfo };
