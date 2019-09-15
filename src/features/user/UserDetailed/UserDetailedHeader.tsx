import * as React from 'react';
import { Grid, Segment, Item, Header } from 'semantic-ui-react';

export interface UserDetailedHeaderProps {
  displayName: string;
  occupation: string;
  homeTown: string;
}

const UserDetailedHeader: React.SFC<UserDetailedHeaderProps> = ({
  displayName,
  occupation,
  homeTown
}) => {
  return (
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
              <Header as='h1'>{displayName}</Header>
              <br />
              <Header as='h3'>{occupation}</Header>
              <br />
              <Header as='h3'>{homeTown}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export { UserDetailedHeader };
