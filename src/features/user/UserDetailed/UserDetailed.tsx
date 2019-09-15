import React from 'react';
import {
  Grid,
  Segment,
  Item,
  Header,
  List,
  Icon,
  Button,
  Image,
  Menu,
  Card
} from 'semantic-ui-react';

export interface UserDetailedProps {}

const UserDetailed: React.SFC<UserDetailedProps> = () => {
  return (
    <Grid>
      {/* Main info */}
      <Grid.Column width={16}>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src='https://randomuser.me/api/portraits/men/51.jpg'
              />
              <Item.Content verticalAlign='bottom'>
                <Header as='h1'>First Name</Header>
                <br />
                <Header as='h3'>Occupation</Header>
                <br />
                <Header as='h3'>27, Lives in London, UK</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Grid.Column>
      {/* About Section */}
      <Grid.Column width={12}>
        <Segment>
          <Grid columns={2}>
            <Grid.Column width={10}>
              <Header icon='smile' content='About Display Name'></Header>
              <p>
                I am a: <strong>Occupation Placeholder</strong>
              </p>
              <p>
                Originally from <strong>United Kingdom</strong>
              </p>
              <p>
                Member Since: <strong>28th March 2018</strong>
              </p>
              <p>Description of user</p>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header icon='heart outline' content='Interests'></Header>
              <List>
                <Item>
                  <Icon name='heart'></Icon>
                  <Item.Content>Interest 1</Item.Content>
                </Item>
                <Item>
                  <Icon name='heart'></Icon>
                  <Item.Content>Interest 2</Item.Content>
                </Item>
                <Item>
                  <Icon name='heart'></Icon>
                  <Item.Content>Interest 3</Item.Content>
                </Item>
              </List>
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
      {/* Edit Section */}
      <Grid.Column width='4'>
        <Segment>
          <Button color='teal' fluid basic content='Edit Profile'></Button>
        </Segment>
      </Grid.Column>
      {/* User Photos Section */}
      <Grid.Column width={12}>
        <Segment attached>
          <Header icon='image' content='Photos'></Header>
          <Image.Group size='small'>
            <Image src='https://randomuser.me/api/portraits/men/1.jpg'></Image>
            <Image src='https://randomuser.me/api/portraits/men/2.jpg'></Image>
            <Image src='https://randomuser.me/api/portraits/men/3.jpg'></Image>
            <Image src='https://randomuser.me/api/portraits/men/4.jpg'></Image>
            <Image src='https://randomuser.me/api/portraits/men/5.jpg'></Image>
            <Image src='https://randomuser.me/api/portraits/men/7.jpg'></Image>
            <Image src='https://randomuser.me/api/portraits/men/8.jpg'></Image>
          </Image.Group>
        </Segment>
      </Grid.Column>
      {/* Events Section */}
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
    </Grid>
  );
};

export { UserDetailed };
