import * as React from 'react';
import { Grid, Segment, Item, Header } from 'semantic-ui-react';
import { UserProfile } from '../userConstants';

export interface UserDetailedHeaderProps {
  userProfile: UserProfile;
}

const UserDetailedHeader: React.SFC<UserDetailedHeaderProps> = ({
  userProfile
}) => {
  const { displayName = '', occupation = '', homeTown = '', photoURL = '' } =
    userProfile || {};
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size='small'
              src={photoURL || '/assets/user.png'}
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
