import * as React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';

export interface UserDetailedSidebarProps {
  isMyProfile: boolean;
}

const UserDetailedSidebar: React.SFC<UserDetailedSidebarProps> = ({
  isMyProfile
}) => {
  return (
    <Grid.Column width='4'>
      <Segment>
        {isMyProfile ? (
          <Button color='teal' fluid basic content='Edit Profile'></Button>
        ) : (
          <Button color='teal' fluid basic content='Follow'></Button>
        )}
      </Segment>
    </Grid.Column>
  );
};

export { UserDetailedSidebar };
