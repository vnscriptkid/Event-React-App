import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Event } from '../eventContants';
import { Link } from 'react-router-dom';

interface Props {
  event: Event;
}

class EventListItem extends Component<Props> {
  render() {
    const {
      hostPhotoURL,
      title,
      host,
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
                <Item.Description>Hosted by {host}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> date |
            <Icon name='marker' /> time
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees.map(attendee => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
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
