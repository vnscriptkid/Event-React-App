import * as React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { WrappedFieldProps } from 'redux-form';
import DatePicker from 'react-datepicker';

export interface DateInputProps extends WrappedFieldProps, HTMLInputElement {}

const DateInput: React.SFC<DateInputProps> = ({
  input,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        onChange={input.onChange}
        selected={input.value ? new Date(input.value) : null}
        onChangeRaw={e => e.preventDefault()}
      />
      {touched && !!error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
