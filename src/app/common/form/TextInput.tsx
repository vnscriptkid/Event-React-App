import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Form, Label } from 'semantic-ui-react';

export interface TextInputProps extends WrappedFieldProps, HTMLInputElement {}

const TextInput: React.SFC<TextInputProps> = props => {
  const {
    meta: { touched, error },
    input,
    type,
    placeholder,
    width,
    ...rest
  } = props;
  return (
    <Form.Field error={touched && !!error} width={width as any}>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        {...(rest as any)}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export { TextInput };
