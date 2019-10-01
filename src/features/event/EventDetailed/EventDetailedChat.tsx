import * as React from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { addEventComment } from '../eventActions';
import { EventDetailedChatForm } from './EventDetailedChatForm';
import { EventChat } from '../eventContants';
import { formatDistance } from 'date-fns';

export interface EventDetailedChatProps {
  addEventComment: typeof addEventComment;
  eventId: string;
  eventChat: EventChat[];
}

const EventDetailedChat: React.SFC<EventDetailedChatProps> = ({
  addEventComment,
  eventId,
  eventChat
}) => {
  return (
    <Segment.Group>
      <Segment
        color='teal'
        inverted
        attached='top'
        textAlign='center'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {eventChat &&
            eventChat.map((chat: EventChat) => (
              <Comment>
                <Comment.Avatar src={chat.photoURL} />
                <Comment.Content>
                  <Comment.Author as='a'>{chat.displayName}</Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(chat.date, Date.now())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{chat.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
        <EventDetailedChatForm
          addEventComment={addEventComment}
          eventId={eventId}
        />
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedChat };
