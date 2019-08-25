import * as React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
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
import { loginUser, socialLogin } from '../authActions';
import { closeModal } from '../../modals/modalActions';
import { SocialLogin } from '../SocialLogin/SocialLogin';

export interface LoginFormProps extends InjectedFormProps {
  login: typeof loginUser;
  closeModal: typeof closeModal;
  socialLogin: typeof socialLogin;
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

interface FormData {
  email: string;
  password: string;
}

const _LoginForm: React.SFC<LoginFormProps> = ({
  handleSubmit,
  login,
  error,
  socialLogin
}) => {
  // const onLoginSubmit = (input: any) => {
  //   login({ email: input.email, password: input.password });
  // };

  return (
    <Form autoComplete='off' onSubmit={handleSubmit(login as any)}>
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
        {!!error && <Label basic color='red' content={error} />}
        <Button fluid size='large' color='teal'>
          Login
        </Button>
        <Divider horizontal>OR</Divider>
        <SocialLogin login={socialLogin} />
      </Segment>
    </Form>
  );
};

const LoginForm = connect(
  null,
  { login: loginUser, closeModal, socialLogin }
)(reduxForm({ form: 'loginForm', validate })(_LoginForm));

export { LoginForm };
