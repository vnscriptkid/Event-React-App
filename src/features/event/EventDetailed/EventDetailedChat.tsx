import * as React from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { addEventComment } from '../eventActions';
import { EventDetailedChatForm } from './EventDetailedChatForm';

export interface EventDetailedChatProps {
  addEventComment: typeof addEventComment;
  eventId: string;
}

const EventDetailedChat: React.SFC<EventDetailedChatProps> = ({
  addEventComment,
  eventId
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
          <Comment>
            <Comment.Avatar src='https://randomuser.me/api/portraits/men/30.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
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
