import React from 'react';
import {
  Segment,
  Header,
  Form,
  Label,
  Divider,
  Button
} from 'semantic-ui-react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextInput } from '../../../app/common/form/TextInput';
import {
  combineValidators,
  isRequired,
  composeValidators,
  matchesField,
  hasLengthGreaterThan
} from 'revalidate';

export interface AccountPageProps extends InjectedFormProps {
  updatePassword(): void;
}

enum FormFields {
  NewPassword = 'NewPassword',
  NewPasswordConfirm = 'NewPasswordConfirm'
}

const validate = combineValidators({
  [FormFields.NewPassword]: composeValidators(
    isRequired({ message: 'Please enter a password' }),
    hasLengthGreaterThan(5)({
      message: 'Password must be at least 6 characters'
    })
  )(),
  [FormFields.NewPasswordConfirm]: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField(FormFields.NewPassword, FormFields.NewPassword)({
      message: 'Passwords do not match'
    })
  )()
});

const _AccountPage: React.SFC<AccountPageProps> = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword
}) => {
  return (
    <Segment>
      <Header dividing size='large' content='Account'></Header>
      <div>
        <Header color='teal' sub content='Change Password'></Header>
        <p>Use this form to update your account settings</p>
        <Form onSubmit={handleSubmit(updatePassword)}>
          <Field
            width={8}
            inline='true'
            name={FormFields.NewPassword}
            type='password'
            pointing='left'
            component={TextInput}
            placeholder='New Password'
            basic='true'
          ></Field>
          <Field
            width={8}
            inline='true'
            name={FormFields.NewPasswordConfirm}
            type='password'
            pointing='left'
            component={TextInput}
            placeholder='New Password Confirm'
            basic='true'
          ></Field>
          {error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          <Divider />
          <Button
            disabled={invalid || submitting}
            size='large'
            positive
            content='Update Password'
          ></Button>
        </Form>
      </div>
    </Segment>
  );
};

const AccountPage = reduxForm({ form: 'account', validate })(_AccountPage);

export { AccountPage };
