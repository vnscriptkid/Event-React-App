import React from 'react';
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { RadioInput } from '../../../app/common/form/RadioInput';
import { TextInput } from '../../../app/common/form/TextInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { AutocompleteInput } from '../../../app/common/form/AutocompleteInput';
import { TextArea } from '../../../app/common/form/TextArea';
import { updateProfile } from '../userActions';

export interface AboutPageProps extends InjectedFormProps {
  updateProfile: typeof updateProfile;
}

enum FieldNames {
  Status = 'status',
  About = 'about',
  Interests = 'interests',
  Occupation = 'occupation',
  Origin = 'origin'
}

enum Status {
  Single = 'single',
  Relationship = 'relationship',
  Married = 'married'
}

interface Record {
  text: string;
  key: string;
  value: string;
}

const statusMapping = [
  { value: Status.Single, label: 'Single' },
  { value: Status.Relationship, label: 'Relationship' },
  { value: Status.Married, label: 'Married' }
];

const interests: Record[] = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const _AboutPage: React.SFC<AboutPageProps> = ({
  pristine,
  submitting,
  handleSubmit,
  updateProfile
}) => {
  return (
    <Segment>
      <Header dividing size='large' content='About Me'></Header>
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Form.Group>
          <label style={{ marginLeft: '7px' }}>Tell us your status: </label>
          {statusMapping.map(({ label, value }, index) => (
            <Field
              key={index}
              name={FieldNames.Status}
              component={RadioInput}
              type='radio'
              value={value}
              label={label}
            />
          ))}
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field
          name={FieldNames.About}
          component={TextArea}
          placeholder='About Me'
        />
        <Field
          name={FieldNames.Interests}
          component={SelectInput}
          options={interests}
          type='text'
          multiple={true}
          placeholder='Select your interests'
        />
        <Field
          width={8}
          name={FieldNames.Occupation}
          type='text'
          component={TextInput}
          placeholder='Occupation'
        />
        <Field
          width={8}
          name={FieldNames.Origin}
          options={{ types: ['(regions)'] }}
          component={AutocompleteInput}
          placeholder='Country of Origin'
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

const AboutPage = reduxForm<any, any>({
  form: 'about',
  enableReinitialize: true,
  destroyOnUnmount: false
})(_AboutPage);

export { AboutPage };
