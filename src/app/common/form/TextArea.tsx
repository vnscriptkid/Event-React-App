import { WrappedFieldProps } from 'redux-form';
import { Form, Label } from 'semantic-ui-react';
import * as React from 'react';

export interface TextAreaProps extends WrappedFieldProps, HTMLTextAreaElement {}

const TextArea: React.SFC<TextAreaProps> = ({
  input,
  meta: { error, touched },
  rows,
  placeholder
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <textarea {...input} rows={rows} placeholder={placeholder} />
      {touched && !!error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export { TextArea };
