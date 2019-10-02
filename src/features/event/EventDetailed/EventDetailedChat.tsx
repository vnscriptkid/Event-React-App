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

const transformToChatTree = (eventChat: EventChat[]): EventChat[] => {
  const hashTable = Object.create(null);
  if (!eventChat) eventChat = [];

  eventChat.forEach((comment: EventChat) => {
    // root level
    if (comment.parentId === 0) {
      // save to hash table to have instant access
      hashTable[comment.id] = comment;
      comment.replies = [];
    } else if (comment.parentId) {
      // child level
      ((hashTable[comment.parentId] as EventChat).replies as any).push(comment);
    }
  });

  const chatTree: any = Object.values(hashTable);

  return chatTree;
};

const EventDetailedChat: React.SFC<EventDetailedChatProps> = ({
  addEventComment,
  eventId,
  eventChat
}) => {
  const [selectedComment, selectCommentToReply] = React.useState<any>(null);

  const handleCommentReplyClick = (commentId: string) => {
    selectCommentToReply(commentId);
  };

  const afterAddingReply = () => {
    selectCommentToReply(null);
  };

  const eventChatTree = transformToChatTree(eventChat);

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
          {eventChatTree &&
            eventChatTree.map((comment: EventChat) => (
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
                        commentId={comment.id}
                        afterAddingComment={afterAddingReply}
                      />
                    )}
                  </Comment.Actions>
                </Comment.Content>
                {/* Replies Section */}
                {comment.replies && (
                  <Comment.Group>
                    {comment.replies.map(reply => (
                      <Comment key={reply.id}>
                        <Comment.Avatar src={reply.photoURL} />
                        <Comment.Content>
                          <Comment.Author as='a'>
                            {reply.displayName}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>
                              {formatDistance(reply.date, Date.now())} ago
                            </div>
                          </Comment.Metadata>
                          <Comment.Text>{reply.text}</Comment.Text>
                          <Comment.Actions>
                            <Comment.Action
                              onClick={() => handleCommentReplyClick(reply.id)}
                            >
                              Reply
                            </Comment.Action>
                            {selectedComment === reply.id && (
                              <EventDetailedChatForm
                                addEventComment={addEventComment}
                                eventId={eventId}
                                form={`reply_${reply.id}`}
                                commentId={comment.id}
                                afterAddingComment={afterAddingReply}
                              />
                            )}
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    ))}
                  </Comment.Group>
                )}
                {/* End of Replies Section */}
              </Comment>
            ))}
        </Comment.Group>
        <EventDetailedChatForm
          addEventComment={addEventComment}
          eventId={eventId}
          form={`newComment`}
        />
      </Segment>
    </Segment.Group>
  );
};

export { EventDetailedChat };
