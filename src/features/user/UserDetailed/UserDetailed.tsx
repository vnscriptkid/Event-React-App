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
import { getfilteredEventsAsync } from '../../event/eventActions';
import { Event } from '../../event/eventContants';
import { createAsyncId } from '../../async/asyncReducer';

export interface UserDetailedProps
  extends WithFirestoreProps,
    RouteComponentProps {
  profile: UserProfile;
  photos: any[];
  userProfile: any;
  isMyProfile: boolean;
  requesting: boolean;
  getfilteredEventsAsync: typeof getfilteredEventsAsync;
  userId: string;
  events: Event[];
  loadingFilteredEvents: boolean;
}

export interface _UserDetailedState {}

class _UserDetailed extends React.Component<
  UserDetailedProps,
  _UserDetailedState
> {
  componentDidMount() {
    this.props.getfilteredEventsAsync(this.props.userId);
  }

  render() {
    const {
      userProfile,
      photos = [],
      isMyProfile,
      requesting,
      history,
      getfilteredEventsAsync,
      userId,
      events,
      loadingFilteredEvents
    } = this.props;

    const dataLoading =
      Object.keys(requesting).length === 0 ||
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
        <UserDetailedEvents
          getfilteredEventsAsync={getfilteredEventsAsync}
          userId={userId}
          events={events}
          loading={loadingFilteredEvents}
        />
      </Grid>
    );
  }
}

const mapState = (
  state: StoreState,
  ownProps: RouteComponentProps<{ id: string }>
) => {
  const loadingFilteredId = createAsyncId({ actionName: 'FilterEvents' });
  const loadingFilteredState =
    state.async[loadingFilteredId] && state.async[loadingFilteredId].loading;

  return {
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    userId: ownProps.match.params.id,
    userProfile: state.firestore.data.userProfile,
    isMyProfile: ownProps.match.params.id === state.firebase.auth.uid,
    requesting: state.firestore.status.requesting,
    events: state.events,
    loadingFilteredEvents: loadingFilteredState
  };
};

const actions = {
  getfilteredEventsAsync
};

const UserDetailed = compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect<any>(({ userId }) => userDetailedQueryFactory(userId))
)(_UserDetailed);

export { UserDetailed };
