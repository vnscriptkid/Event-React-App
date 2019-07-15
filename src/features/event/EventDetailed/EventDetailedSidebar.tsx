import * as React from 'react';
import { Segment, Header, Item, Label } from 'semantic-ui-react';

export interface EventDetailedSidebarProps {}

const EventDetailedSidebar: React.SFC<EventDetailedSidebarProps> = () => {
  return (
    <Segment.Group>
      <Segment color='teal' inverted>
        <Header>2 People Going</Header>
      </Segment>
      <Segment>
        <Item.Group divided>
          <Item style={{ position: 'relative' }}>
            <Label
              ribbon='right'
              color='orange'
              style={{ position: 'absolute' }}
            >
              Host
            </Label>
            <Item.Image
              size='tiny'
              src='https://randomuser.me/api/portraits/men/30.jpg'
            />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>Thanh Nguyen</Item.Header>
            </Item.Content>
          </Item>
          <Item style={{ position: 'relative' }}>
            <Item.Image
              size='tiny'
              src='https://randomuser.me/api/portraits/men/20.jpg'
            />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>Dung Nguyen</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedSidebar };
