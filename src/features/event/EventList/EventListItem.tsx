import React, { Component } from 'react';
import { Segment, Item, List, Button, Icon, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Event } from '../eventContants';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { mergeKeyToObject } from '../../../app/common/utils/converter';

interface Props {
  event: Event;
}

class EventListItem extends Component<Props> {
  render() {
    const {
      hostPhotoURL,
      title,
      hostedBy,
      attendees = {},
      description,
      id,
      date,
      venue,
      cancelled
    } = this.props.event;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size='tiny'
                circular
                src={hostPhotoURL || '/assets/user.png'}
              />
              <Item.Content>
                <Item.Header as={Link} to={`/events/${id}`}>
                  {title}
                </Item.Header>
                <Item.Description>Hosted by {hostedBy}</Item.Description>
                {cancelled && (
                  <Label
                    style={{ top: -40 }}
                    ribbon='right'
                    content='This event has been cancelled'
                    color='red'
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' />{' '}
            {format((date as any).toDate(), 'EEEE do MMMM h:mm aaaa')} |
            <Icon name='marker' /> {venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {mergeKeyToObject(attendees).map(attendee => (
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
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
