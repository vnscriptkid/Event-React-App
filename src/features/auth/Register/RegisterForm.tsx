import * as React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextInput } from '../../../app/common/form/TextInput';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { isValidEmail } from '../../../app/common/validations';
import { connect } from 'react-redux';
import { registerUser } from '../authActions';
import { SocialLogin } from '../SocialLogin/SocialLogin';

export interface RegisterFormProps extends InjectedFormProps {
  registerUser: typeof registerUser;
}

enum FieldNames {
  email = 'email',
  password = 'password',
  confirm = 'confirm',
  displayName = 'displayName'
}

const validate = combineValidators({
  email: composeValidators(
    isRequired({ message: 'Email is required' }),
    isValidEmail
  )(),
  password: composeValidators(
    isRequired({ message: 'Password is required' }),
    hasLengthGreaterThan(5)({
      message: 'Password must be at least 6 characters'
    })
  )(),
  displayName: isRequired({ message: 'Display Name is required' })
});

const confirmMustMatch = (value: string, allValues: any): any => {
  return value !== allValues.password ? 'Passwords do not match' : undefined;
};

const _RegisterForm: React.SFC<RegisterFormProps> = ({
  handleSubmit,
  registerUser,
  error
}) => {
  return (
    <Form autoComplete='off' onSubmit={handleSubmit(registerUser as any)}>
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
          validate={[confirmMustMatch]}
        />
        {!!error && <Label basic color='red' content={error} />}
        <Button fluid size='large' color='teal'>
          Register
        </Button>
        <Divider horizontal>OR</Divider>
        <SocialLogin />
      </Segment>
    </Form>
  );
};

export const RegisterForm = connect(
  null,
  { registerUser }
)(reduxForm({ form: 'registerForm', validate })(_RegisterForm));
