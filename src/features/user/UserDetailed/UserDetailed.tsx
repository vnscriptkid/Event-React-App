import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { UserProfile } from '../userConstants';
import { compose } from 'redux';
import { firestoreConnect, WithFirestoreProps } from 'react-redux-firebase';
import { UserDetailedHeader } from './UserDetailedHeader';
import { UserDetailedAbout } from './UserDetailedAbout';
import { UserDetailedPhotos } from './UserDetailedPhotos';
import { UserDetailedEvents } from './UserDetailedEvents';

export interface UserDetailedProps extends WithFirestoreProps {
  profile: UserProfile;
  photos: any[];
}

const _UserDetailed: React.SFC<UserDetailedProps> = ({
  profile: {
    displayName = '',
    occupation = 'btn',
    homeTown = 'btn',
    about = '',
    origin = 'btn',
    interests = [],
    createdAt
  },
  photos = []
}) => {
  return (
    <Grid>
      {/* General info */}
      <UserDetailedHeader
        displayName={displayName}
        occupation={occupation}
        homeTown={homeTown}
      />
      {/* About Section */}
      <UserDetailedAbout
        displayName={displayName}
        occupation={occupation}
        about={about}
        origin={origin}
        interests={interests}
        createdAt={createdAt}
      />
      {/* Edit Section */}
      <Grid.Column width='4'>
        <Segment>
          <Button color='teal' fluid basic content='Edit Profile'></Button>
        </Segment>
      </Grid.Column>
      {/* User Photos Section */}
      <UserDetailedPhotos photos={photos} />
      {/* Events Section */}
      <UserDetailedEvents />
    </Grid>
  );
};

const mapState = (state: StoreState) => ({
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  auth: state.firebase.auth
});

const UserDetailed = compose(
  connect(mapState),
  firestoreConnect<any>(({ auth }) =>
    auth.isLoaded
      ? [
          {
            collection: `users`,
            doc: auth.uid,
            subcollections: [{ collection: `photos` }],
            storeAs: 'photos'
          }
        ]
      : []
  )
)(_UserDetailed);

// const UserDetailed = connect(mapState)(_UserDetailed);

export { UserDetailed };
