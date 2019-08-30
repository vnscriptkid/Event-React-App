import React from 'react';
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextInput } from '../../../app/common/form/TextInput';
import DateInput from '../../../app/common/form/DateInput';
import { AutocompleteInput } from '../../../app/common/form/AutocompleteInput';
import { RadioInput } from '../../../app/common/form/RadioInput';
import { addYears } from 'date-fns';
import { updateProfile } from '../userActions';

export interface BasicPageProps extends InjectedFormProps {
  updateProfile: typeof updateProfile;
}

enum FieldNames {
  DisplayName = 'displayName',
  DateOfBirth = 'dateOfBirth',
  HomeTown = 'homeTown',
  Gender = 'gender'
}

const _BasicPage: React.SFC<BasicPageProps> = ({
  pristine,
  submitting,
  handleSubmit,
  updateProfile
}) => {
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
        <Form.Group>
          <Field
            name={FieldNames.Gender}
            value='male'
            type='radio'
            label='Male'
            component={RadioInput}
          />
          <Field
            name={FieldNames.Gender}
            value='female'
            type='radio'
            label='Female'
            component={RadioInput}
          />
        </Form.Group>
        <Field
          width={8}
          name={FieldNames.DateOfBirth}
          component={DateInput}
          placeholder='Date Of Birth'
          dateFormat='dd LLL yyyy'
          showYearDropdown={true}
          showMonthDropdown={true}
          dropdownMode='select'
          maxDate={addYears(new Date(), -18)}
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
          onClick={handleSubmit(updateProfile)}
          disabled={pristine || submitting}
          size='large'
          positive
          content='Update Profile'
        ></Button>
      </Form>
    </Segment>
  );
};

const BasicPage = reduxForm<any, any>({
  form: 'profile',
  enableReinitialize: true
})(_BasicPage);

export { BasicPage };
