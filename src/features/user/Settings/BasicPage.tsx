import React from 'react';
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextInput } from '../../../app/common/form/TextInput';
import DateInput from '../../../app/common/form/DateInput';
import { AutocompleteInput } from '../../../app/common/form/AutocompleteInput';

export interface BasicPageProps extends InjectedFormProps {}

enum FieldNames {
  DisplayName = 'displayName',
  DateOfBirth = 'dateOfBirth',
  HomeTown = 'homeTown'
}

const _BasicPage: React.SFC<BasicPageProps> = ({ pristine, submitting }) => {
  return (
    <Segment>
      <Header dividing size='large' content='Basics'></Header>
      <Form>
        <Field
          width={8}
          name={FieldNames.DisplayName}
          type='text'
          component={TextInput}
          placeholder='Known As'
        />
        <Field
          width={8}
          name={FieldNames.DateOfBirth}
          component={DateInput}
          placeholder='Date Of Birth'
        />
        <Field
          width={8}
          name={FieldNames.HomeTown}
          options={{ types: ['(cities)'] }}
          type='text'
          component={AutocompleteInput}
          placeholder='Home Town'
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size='large'
          positive
          content='Update Profile'
        ></Button>
      </Form>
    </Segment>
  );
};

const BasicPage = reduxForm({ form: 'profile', enableReinitialize: true })(
  _BasicPage
);

export { BasicPage };
