import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { addEventComment } from '../eventActions';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { TextArea } from '../../../app/common/form/TextArea';
import { toastr } from 'react-redux-toastr';

export interface EventDetailedChatFormProps extends InjectedFormProps {
  addEventComment: typeof addEventComment;
  eventId: string;
}

const _EventDetailedChatForm: React.SFC<EventDetailedChatFormProps> = ({
  addEventComment,
  eventId,
  handleSubmit,
  reset
}) => {
  const handleAddingComment = async (values: any) => {
    try {
      await addEventComment(eventId, values);
      reset();
    } catch (e) {
      toastr.error('Ooops!', 'Can not add comment');
    }
  };

  return (
    <Form reply onSubmit={handleSubmit(handleAddingComment)}>
      <Field component={TextArea} name='comment' rows={2} />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  );
};

const EventDetailedChatForm = reduxForm<any, any>({
  Fields: 'comment'
} as any)(_EventDetailedChatForm);

export { EventDetailedChatForm };
