import * as React from 'react';
import { Grid, Segment, Header, Menu, Card, Image } from 'semantic-ui-react';
export interface UserDetailedEventsProps {}

const UserDetailedEvents: React.SFC<UserDetailedEventsProps> = () => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon='calendar' content='Events'></Header>
        <Menu secondary pointing>
          <Menu.Item name='All Events' active></Menu.Item>
          <Menu.Item name='Past Events'></Menu.Item>
          <Menu.Item name='Future Events'></Menu.Item>
          <Menu.Item name='Events Hosted'></Menu.Item>
        </Menu>
        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src='/assets/categoryImages/drinks.jpg' />
            <Card.Content textAlign='center'>
              <Card.Header>Event Title</Card.Header>
              <Card.Meta textAlign='center'>
                28th March 2018 at 10:00 PM
              </Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <Image src='/assets/categoryImages/drinks.jpg' />
            <Card.Content textAlign='center'>
              <Card.Header>Event Title</Card.Header>
              <Card.Meta textAlign='center'>
                28th March 2018 at 10:00 PM
              </Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <Image src='/assets/categoryImages/drinks.jpg' />
            <Card.Content textAlign='center'>
              <Card.Header>Event Title</Card.Header>
              <Card.Meta textAlign='center'>
                28th March 2018 at 10:00 PM
              </Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <Image src='/assets/categoryImages/drinks.jpg' />
            <Card.Content textAlign='center'>
              <Card.Header>Event Title</Card.Header>
              <Card.Meta textAlign='center'>
                28th March 2018 at 10:00 PM
              </Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export { UserDetailedEvents };
