import * as React from 'react';
import { FormField } from 'semantic-ui-react';
import { WrappedFieldProps } from 'redux-form';

export interface RadioInputProps extends HTMLInputElement, WrappedFieldProps {
  label: string;
}

const RadioInput: React.SFC<RadioInputProps> = ({
  input,
  width,
  type,
  label
}) => {
  return (
    <FormField>
      <div className='ui radio'>
        <input {...input} type={type} />
        <label>{label}</label>
      </div>
    </FormField>
  );
};

export { RadioInput };
