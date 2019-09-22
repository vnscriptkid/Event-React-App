import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { UserProfile } from '../userConstants';
import { compose } from 'redux';
import { firestoreConnect, WithFirestoreProps } from 'react-redux-firebase';
import { UserDetailedHeader } from './UserDetailedHeader';
import { UserDetailedAbout } from './UserDetailedAbout';
import { UserDetailedPhotos } from './UserDetailedPhotos';
import { UserDetailedEvents } from './UserDetailedEvents';
import { RouteComponentProps } from 'react-router';
import { userDetailedQueryFactory } from './userQueries';
import { UserDetailedSidebar } from './UserDetailedSidebar';
import { Loading } from '../../../app/layout/Loading';
import { toastr } from 'react-redux-toastr';

export interface UserDetailedProps
  extends WithFirestoreProps,
    RouteComponentProps {
  profile: UserProfile;
  photos: any[];
  userProfile: any;
  isMyProfile: boolean;
  requesting: boolean;
}

const _UserDetailed: React.SFC<UserDetailedProps> = ({
  userProfile,
  photos = [],
  isMyProfile,
  requesting,
  history
}) => {
  const dataLoading =
    Object.keys(requesting).length &&
    Object.values(requesting).some(i => i === true);
  if (dataLoading) return <Loading />;
  if (!userProfile) {
    toastr.error('Error', 'Can not fetch user profile');
    history.push('/events');
  }
  return (
    <Grid>
      <UserDetailedHeader userProfile={userProfile} />
      <UserDetailedAbout userProfile={userProfile} />
      <UserDetailedSidebar isMyProfile={isMyProfile} />
      <UserDetailedPhotos photos={photos} />
      <UserDetailedEvents />
    </Grid>
  );
};

const mapState = (
  state: StoreState,
  ownProps: RouteComponentProps<{ id: string }>
) => ({
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  userId: ownProps.match.params.id,
  userProfile: state.firestore.data.userProfile,
  isMyProfile: ownProps.match.params.id === state.firebase.auth.uid,
  requesting: state.firestore.status.requesting
});

const UserDetailed = compose(
  connect(mapState),
  firestoreConnect<any>(({ userId }) => userDetailedQueryFactory(userId))
)(_UserDetailed);

export { UserDetailed };
