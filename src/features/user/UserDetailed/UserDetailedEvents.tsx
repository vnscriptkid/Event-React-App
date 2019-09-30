import * as React from 'react';
import { Grid, Segment, Header, Menu, Card, Image } from 'semantic-ui-react';
import {
  EventFilterType,
  getfilteredEventsAsync
} from '../../event/eventActions';
import { Event } from '../../event/eventContants';
import { format } from 'date-fns';

export interface UserDetailedEventsProps {
  userId: string;
  events: Event[];
  getfilteredEventsAsync: typeof getfilteredEventsAsync;
  loading: boolean;
}

const filtersMapping = [
  { id: EventFilterType.All_Events, text: 'All Events' },
  { id: EventFilterType.Past_Events, text: 'Past Events' },
  { id: EventFilterType.Future_Events, text: 'Future Events' },
  { id: EventFilterType.Hosted_Events, text: 'Events Hosted' }
];

const UserDetailedEvents: React.SFC<UserDetailedEventsProps> = ({
  events = [],
  userId,
  getfilteredEventsAsync,
  loading
}) => {
  const [activeTab, changeActiveFitler] = React.useState(
    EventFilterType.All_Events
  );

  const handleFilterChange = (filter: EventFilterType) => {
    changeActiveFitler(filter);
    getfilteredEventsAsync(userId, filter);
  };

  return (
    <Grid.Column width={12}>
      <Segment attached loading={loading}>
        <Header icon='calendar' content='Events'></Header>
        <Menu secondary pointing>
          {filtersMapping.map(filter => (
            <Menu.Item
              key={filter.id}
              name={filter.text}
              active={filter.id === activeTab}
              onClick={() => handleFilterChange(filter.id)}
            ></Menu.Item>
          ))}
        </Menu>
        <Card.Group itemsPerRow={5}>
          {events.map((event: Event) => (
            <Card key={event.id}>
              <Image src='/assets/categoryImages/drinks.jpg' />
              <Card.Content textAlign='center'>
                <Card.Header>{event.title}</Card.Header>
                <Card.Meta textAlign='center'>
                  {format((event.date as any).toDate(), "do MMMM y 'at' H:mm")}
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export { UserDetailedEvents };
