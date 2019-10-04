import * as React from 'react';
import { Header, Segment, Feed } from 'semantic-ui-react';
import { Activity, ActivityType } from '../eventContants';
import { EventActivityItem } from './EventActivityItem';

export interface EventActivityProps {}

const activites: Activity[] = [
  {
    id: '1',
    eventId: '1',
    hostUid: '1',
    hostedBy: 'Thanh',
    photoURL: '/assets/user.png',
    timestamp: {
      toDate: () => new Date()
    } as any,
    title: 'super event',
    type: ActivityType.NewEvent
  },
  {
    id: '2',
    eventId: '2',
    hostUid: '2',
    hostedBy: 'Linh',
    photoURL: '/assets/user.png',
    timestamp: {
      toDate: () => new Date()
    } as any,
    title: 'small event',
    type: ActivityType.CancelEvent
  }
];

const EventActivity: React.SFC<EventActivityProps> = () => {
  return (
    <React.Fragment>
      <Header attached='top' content='Recent Activity' />
      <Segment attached>
        <Feed>
          {activites.map((activity: Activity) => (
            <EventActivityItem activity={activity} key={activity.id} />
          ))}
        </Feed>
      </Segment>
    </React.Fragment>
  );
};

export { EventActivity };
