import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Event, Attendee } from '../EventDashboard/EventDashboard';

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
      description
    } = this.props.event;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{hostedBy}</a>
                </Item.Description>
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
          {/* <List horizontal>todo: attendees go here</List> */}
          <List horizontal>
            {attendees.map(attendee => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{description}</span>
          <Button as='a' color='teal' floated='right' content='view' />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
