import * as React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from '../../../app/common/form/TextInput';

export interface RegisterFormProps {}

enum FieldNames {
  email = 'email',
  password = 'password',
  confirm = 'confirm',
  displayName = 'displayName'
}

const _RegisterForm: React.SFC<RegisterFormProps> = () => {
  return (
    <Form autoComplete='off'>
      <Segment>
        <Field
          name={FieldNames.email}
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          name={FieldNames.displayName}
          component={TextInput}
          type='text'
          placeholder='Display Name'
        />
        <Field
          name={FieldNames.password}
          component={TextInput}
          type='password'
          placeholder='Password'
        />
        <Field
          name={FieldNames.confirm}
          component={TextInput}
          type='password'
          placeholder='Confirm Password'
        />
        <Button fluid size='large' color='teal'>
          Register
        </Button>
      </Segment>
    </Form>
  );
};

const RegisterForm = reduxForm({ form: 'registerForm' })(_RegisterForm);

export { RegisterForm };
