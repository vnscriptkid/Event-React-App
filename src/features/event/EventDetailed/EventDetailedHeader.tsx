import * as React from 'react';
import { Segment, Image, Button, Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { convertTsToDate } from '../../../app/common/utils/datetime';
import { Event } from '../eventContants';

export interface EventDetailedHeaderProps {
  event?: Event;
  isHost: boolean;
  isGoing: boolean;
}

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  color: 'white'
};

const EventDetailedHeader: React.SFC<EventDetailedHeaderProps> = ({
  event,
  isHost,
  isGoing
}) => {
  const { title = '', date = '', hostedBy = '', id = '' } = event || {};
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
                  content={title}
                  style={{ color: 'white' }}
                />
                <p>{date && convertTsToDate(date as any)}</p>
                <p>
                  Hosted by <strong>{hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached='bottom' clearing>
        {!isHost && (
          <React.Fragment>
            {isGoing ? (
              <Button>Cancel My Place</Button>
            ) : (
              <Button color='blue'>Join This Event</Button>
            )}
          </React.Fragment>
        )}
        <Button as={Link} to={`/manage/${id}`} color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedHeader };
