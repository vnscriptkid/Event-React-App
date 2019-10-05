import * as React from 'react';
import { Header, Segment, Feed } from 'semantic-ui-react';
import { Activity } from '../eventContants';
import { EventActivityItem } from './EventActivityItem';
import { compose } from 'redux';
import {
  firestoreConnect,
  ReduxFirestoreQuerySetting
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';

export interface EventActivityProps {
  activities: Activity[];
}

const _EventActivity: React.SFC<EventActivityProps> = ({ activities }) => {
  return (
    <React.Fragment>
      <Header attached='top' content='Recent Activity' />
      <Segment attached>
        <Feed>
          {activities.map((activity: Activity) => (
            <EventActivityItem activity={activity} key={activity.id} />
          ))}
        </Feed>
      </Segment>
    </React.Fragment>
  );
};

const query: ReduxFirestoreQuerySetting = {
  collection: `activities`,
  limit: 5,
  storeAs: `activities`
};

const mapState = (state: StoreState) => ({
  activities: state.firestore.ordered.activities || []
});

const EventActivity = compose(
  firestoreConnect([query]),
  connect(mapState)
)(_EventActivity) as any;

export { EventActivity };
