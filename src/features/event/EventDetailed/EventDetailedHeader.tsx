import * as React from 'react';
import { Segment, Image, Button, Item, Header } from 'semantic-ui-react';

export interface EventDetailedHeaderProps {}

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  color: 'white'
};

const EventDetailedHeader: React.SFC<EventDetailedHeaderProps> = () => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: 0, overflow: 'hidden' }}>
        <Image
          src='/assets/categoryImages/drinks.jpg'
          fluid
          style={eventImageStyle}
        />
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content='Event Title'
                  style={{ color: 'white' }}
                />
                <p>Event Date</p>
                <p>
                  Hosted by <strong>@Thanh Nguyen</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached='bottom'>
        <Button>Cancel My Place</Button>
        <Button color='blue'>Join This Event</Button>
        <Button color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedHeader };
