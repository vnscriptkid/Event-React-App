import * as React from 'react';
import { Grid, Segment, Header, List, Item, Icon } from 'semantic-ui-react';
import { format } from 'date-fns/esm';
import { UserProfile } from 'react-redux-firebase';

export interface UserDetailedAboutProps {
  userProfile: UserProfile;
}

const UserDetailedAbout: React.SFC<UserDetailedAboutProps> = ({
  userProfile
}) => {
  const {
    displayName = '',
    occupation = '',
    origin = '',
    about = '',
    interests = [],
    createdAt = null
  } = userProfile || {};
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon='smile' content={`About ${displayName}`}></Header>
            <p>
              I am a: <strong>{occupation}</strong>
            </p>
            <p>
              Originally from <strong>{origin}</strong>
            </p>
            <p>
              Member Since:
              <strong>
                {createdAt &&
                  format(new Date(createdAt.toDate()), ' do MMMM yyyy')}
              </strong>
            </p>
            {about && <p>Description: {about}</p>}
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon='heart outline' content='Interests'></Header>
            {interests.length > 0 ? (
              <List>
                {interests.map((interest: string, index: number) => (
                  <Item key={index}>
                    <Icon name='heart'></Icon>
                    <Item.Content>{interest}</Item.Content>
                  </Item>
                ))}
              </List>
            ) : (
              'No interests at all'
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export { UserDetailedAbout };
