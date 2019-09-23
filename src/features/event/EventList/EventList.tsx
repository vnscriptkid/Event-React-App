import * as React from 'react';
import { EventListItem } from './EventListItem';
import { Event } from '../eventContants';
import InfiniteScroll from 'react-infinite-scroller';

export interface EventListProps {
  events: Event[];
  loadMore(): void;
  hasMoreEvents: boolean;
  loading: boolean;
}

const EventList: React.SFC<EventListProps> = ({
  events = [],
  loadMore,
  hasMoreEvents,
  loading
}) => {
  return (
    <React.Fragment>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && hasMoreEvents} // check loading to avoid duplicate data
        initialLoad={false}
      >
        {events.map(event => (
          <EventListItem key={event.id} event={event} />
        ))}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export { EventList };
