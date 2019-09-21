import * as React from 'react';
import { Segment, Image, Button, Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { convertTsToDate } from '../../../app/common/utils/datetime';
import { Event } from '../eventContants';
import { joinEventAsync, cancelGoingToEvent } from '../eventActions';
import { toastr } from 'react-redux-toastr';

export interface EventDetailedHeaderProps {
  event?: Event;
  isHost: boolean;
  isGoing: boolean;
  joinEventAsync: typeof joinEventAsync;
  cancelGoingToEvent: typeof cancelGoingToEvent;
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
  isGoing,
  joinEventAsync,
  cancelGoingToEvent
}) => {
  const { title = '', date = '', hostedBy = '', id = '', hostUid = '' } =
    event || {};

  const handleJoinEvent = async (event?: Event) => {
    if (!event) return;
    try {
      await joinEventAsync(event);
      toastr.success('Success', 'You have joined the event');
    } catch (e) {
      toastr.error('Oooops!', e.message);
    }
  };

  const handleCancelGoingToEvent = async (event?: Event) => {
    if (!event) return;
    try {
      await cancelGoingToEvent(event);
      toastr.success('Success', 'You have cancelled going to this event');
    } catch (e) {
      toastr.error('Oooops', e.message);
    }
  };

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
                  Hosted by{' '}
                  <strong>
                    <Link to={`/profile/${hostUid}`}>{hostedBy}</Link>
                  </strong>
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
              <Button onClick={() => handleCancelGoingToEvent(event)}>
                Cancel My Place
              </Button>
            ) : (
              <Button color='blue' onClick={() => handleJoinEvent(event)}>
                Join This Event
              </Button>
            )}
          </React.Fragment>
        )}
        {isHost && (
          <Button as={Link} to={`/manage/${id}`} color='orange' floated='right'>
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedHeader };
