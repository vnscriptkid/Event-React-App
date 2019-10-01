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
  const [selectedComment, selectCommentToReply] = React.useState<any>(null);

  const handleCommentReplyClick = (commentId: string) => {
    selectCommentToReply(commentId);
  };

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
            eventChat.map((comment: EventChat) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL} />
                <Comment.Content>
                  <Comment.Author as='a'>{comment.displayName}</Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.date, Date.now())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() => handleCommentReplyClick(comment.id)}
                    >
                      Reply
                    </Comment.Action>
                    {selectedComment === comment.id && (
                      <EventDetailedChatForm
                        addEventComment={addEventComment}
                        eventId={eventId}
                        form={`reply_${comment.id}`}
                      />
                    )}
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
        <EventDetailedChatForm
          addEventComment={addEventComment}
          eventId={eventId}
          form={`reply_${eventId}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedChat };
