import { WrappedFieldProps } from 'redux-form';
import { Form, Select } from 'semantic-ui-react';
import * as React from 'react';

export interface SelectInputProps extends WrappedFieldProps, HTMLSelectElement {
  placeholder: string;
}

const SelectInput: React.SFC<SelectInputProps> = ({
  input,
  meta: { error, touched },
  options,
  multiple,
  placeholder
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        options={options as any}
        type='text'
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        multiple={multiple}
        placeholder={placeholder}
      />
    </Form.Field>
  );
};

export { SelectInput };
