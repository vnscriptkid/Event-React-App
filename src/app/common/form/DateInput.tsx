import * as React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { WrappedFieldProps } from 'redux-form';
import DatePicker from 'react-datepicker';

export interface DateInputProps extends WrappedFieldProps, HTMLInputElement {}

const DateInput: React.SFC<DateInputProps> = ({
  input: { value, onChange },
  placeholder,
  meta: { touched, error },
  width,
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width as any}>
      <DatePicker
        placeholderText={placeholder}
        onChange={onChange}
        selected={
          value
            ? Object.prototype.toString.call(value) === '[object Date]'
              ? value
              : value.toDate()
            : null
        }
        onChangeRaw={e => e.preventDefault()}
        {...rest}
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
