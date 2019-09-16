import React, { Component } from 'react';
import { Segment, Item, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Event } from '../eventContants';
import { Link } from 'react-router-dom';
// import { convertTsToDateTime } from '../../../app/common/utils/datetime';

interface Props {
  event: Event;
}

class EventListItem extends Component<Props> {
  render() {
    const {
      hostPhotoURL,
      title,
      hostedBy,
      attendees,
      description,
      id
    } = this.props.event;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header>{title}</Item.Header>
                <Item.Description>Hosted by {hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            {/* <Icon name='clock' /> {convertTsToDateTime(date as any)} |
            <Icon name='marker' /> time */}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {Object.values(attendees).map((attendee, index) => (
              // TODO: `key` should be id, not index
              <EventListAttendee key={index} attendee={attendee} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{description}</span>

          <Button
            as={Link}
            to={`/events/${id}`}
            color='teal'
            floated='right'
            content='View'
          />
          <Button color='red' floated='right' content='Delete' />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
