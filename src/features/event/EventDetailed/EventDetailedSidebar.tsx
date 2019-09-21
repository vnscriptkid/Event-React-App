import * as React from 'react';
import { Segment, Header, Item, Label } from 'semantic-ui-react';
import { Attendee } from '../eventContants';
import { Link } from 'react-router-dom';

export interface EventDetailedSidebarProps {
  attendees: Attendee[];
}

const EventDetailedSidebar: React.SFC<EventDetailedSidebarProps> = props => {
  const { attendees = [] } = props;
  return (
    <Segment.Group>
      <Segment color='teal' inverted>
        <Header>{attendees.length} People Going</Header>
      </Segment>
      <Segment>
        <Item.Group divided>
          {attendees.map((attendee, index) => (
            <Item key={attendee.id} style={{ position: 'relative' }}>
              {index === 0 && (
                <Label
                  ribbon='right'
                  color='orange'
                  style={{ position: 'absolute' }}
                >
                  Host
                </Label>
              )}
              <Item.Image size='tiny' src={attendee.photoURL} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profile/${attendee.id}`}>
                    {attendee.displayName}
                  </Link>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedSidebar };
