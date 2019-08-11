import * as React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextInput } from '../../../app/common/form/TextInput';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';
import { isValidEmail } from '../../../app/common/validations';
import { connect } from 'react-redux';
import { loginUser } from '../authActions';
import { closeModal } from '../../modals/modalActions';

export interface LoginFormProps extends InjectedFormProps {
  login: typeof loginUser;
  closeModal: typeof closeModal;
}

enum FieldNames {
  email = 'email',
  password = 'password'
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
  )()
});

const _LoginForm: React.SFC<LoginFormProps> = ({
  handleSubmit,
  login,
  closeModal
}) => {
  const onLoginSubmit = (input: any) => {
    login(input.email);
    closeModal();
  };

  return (
    <Form autoComplete='off' onSubmit={handleSubmit(onLoginSubmit)}>
      <Segment>
        <Field
          name={FieldNames.email}
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          name={FieldNames.password}
          component={TextInput}
          type='password'
          placeholder='Password'
        />
        <Button fluid size='large' color='teal'>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

const LoginForm = connect(
  null,
  { login: loginUser, closeModal }
)(reduxForm({ form: 'loginForm', validate })(_LoginForm));

export { LoginForm };
