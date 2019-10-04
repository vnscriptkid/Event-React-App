import * as React from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { Activity, ActivityType } from '../eventContants';

export interface EventActivityItemProps {
  activity: Activity;
}

const EventActivityItem: React.SFC<EventActivityItemProps> = props => {
  const { photoURL, timestamp } = props.activity;

  const renderSummary = (activity: Activity) => {
    switch (activity.type) {
      case ActivityType.NewEvent:
        return (
          <div>
            New Event!{' '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile' + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            is hosting{' '}
            <Link to={{ pathname: `/event/${activity.eventId}` }}>
              {activity.title}
            </Link>
          </div>
        );
      case ActivityType.CancelEvent:
        return (
          <div>
            Event Cancelled!{' '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile' + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            has cancelled{' '}
            <Link to={{ pathname: `/event/${activity.eventId}` }}>
              {activity.title}
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Feed.Event>
      <Feed.Label>
        <img src={photoURL || '/assets/user.png'} alt='' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>{renderSummary(props.activity)}</Feed.Summary>
        <Feed.Meta>
          <Feed.Date>
            {formatDistance(timestamp.toDate(), Date.now())} ago
          </Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export { EventActivityItem };
