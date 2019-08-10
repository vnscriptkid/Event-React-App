/*global google*/
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';

import { StoreState } from '../../../app/reducers';
import { createEvent, updateEvent } from '../eventActions';
import { Event } from '../eventContants';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { TextInput } from '../../../app/common/form/TextInput';
import { TextArea } from '../../../app/common/form/TextArea';
import { SelectInput } from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import 'react-datepicker/dist/react-datepicker.css';
import { AutocompleteInput } from '../../../app/common/form/AutocompleteInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

interface Props extends RouteComponentProps {
  createEvent: typeof createEvent;
  updateEvent: typeof updateEvent;
}

interface State {
  cityLatlng: google.maps.LatLngLiteral | null;
  venueLatLng: google.maps.LatLngLiteral | null;
}

enum InputNames {
  title = 'title',
  date = 'date',
  city = 'city',
  venue = 'venue',
  category = 'category',
  description = 'description'
}

const categories: any[] = [
  { key: 'culture', text: 'Culture', value: 'Culture' },
  { key: 'nature', text: 'Nature', value: 'Nature' }
];

// interface FormData {
//   title: string;
//   category: string;
//   description: string;
//   date: string;
//   city: string;
//   venue: string;
// }
const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'The category is required' }),
  description: composeValidators(
    isRequired({ message: 'Please enter the description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

type AllProps = Props & InjectedFormProps;

class _EventForm extends Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
      venueLatLng: null,
      cityLatlng: null
    };
  }

  onFormSubmit: any = (values: Event) => {
    values.date = values.date.toString();
    if (values.id) {
      this.props.updateEvent(values.id, values);
      this.props.history.push(`/events/${values.id}`);
    } else {
      // create form
      const newEvent = {
        ...values,
        id: Date.now().toString(),
        host: 'someone',
        hostPhotoURL: `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 30 + 1
        )}.jpg`,
        attendees: []
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = (city: string): void => {
    this.props.change(InputNames.city, city);
    this.getGeocodeByAddress(city, (latLng: google.maps.LatLngLiteral) =>
      this.setState({ cityLatlng: latLng })
    );
  };

  handleVenueSelect = (venue: string): void => {
    this.props.change(InputNames.venue, venue);
    this.getGeocodeByAddress(venue, (latLng: google.maps.LatLngLiteral) =>
      this.setState({ venueLatLng: latLng })
    );
  };

  getGeocodeByAddress = (address: string, cb: Function): void => {
    geocodeByAddress(address)
      .then(results => results[0])
      .then(geo => getLatLng(geo))
      .then(latLng => cb(latLng));
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;

    let venueOptions = {};
    if (this.state.cityLatlng) {
      const { lat, lng } = this.state.cityLatlng;
      venueOptions = {
        location: new google.maps.LatLng(lat, lng),
        radius: 10000,
        types: ['establishment']
      };
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Header sub color='teal' content='Event Details' />
              <Field
                component={TextInput}
                name={InputNames.title}
                type='text'
                placeholder='Type in the name of event'
              />
              <Field
                component={SelectInput}
                name={InputNames.category}
                type='text'
                options={categories}
                placeholder='What is the event about?'
              />
              <Field
                component={TextArea}
                name={InputNames.description}
                rows={3}
                placeholder='Tell us something about ur event'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                component={AutocompleteInput}
                name={InputNames.city}
                options={{ types: ['(cities)'] }}
                placeholder='Event City'
                handleSelect={this.handleCitySelect}
              />
              <Field
                component={AutocompleteInput}
                name={InputNames.venue}
                type='text'
                placeholder='Event Venue'
                options={venueOptions}
                disabled={!this.state.cityLatlng}
                handleSelect={this.handleVenueSelect}
              />
              <Field
                component={DateInput}
                name={InputNames.date}
                placeholder='Event Date'
                dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat='HH:mm'
              />
              <Button
                disabled={pristine || invalid || submitting}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button
                type='button'
                onClick={
                  (initialValues as any).id
                    ? () => history.push(`/events/${(initialValues as any).id}`)
                    : () => history.push('/events')
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
  ownProps: RouteComponentProps<{ id: string }>
) => {
  let initialValues = {
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  };
  const id = ownProps.match.params.id;
  const foundEvent = state.events.find(event => event.id === id);
  if (id && foundEvent) {
    initialValues = foundEvent;
  }
  return { initialValues };
};

// todo: fix any (just a workaround)
const DecoratedForm = reduxForm<{}, any>({ form: 'event', validate })(
  _EventForm
);

export const EventForm = connect(
  mapStateToProps,
  { createEvent, updateEvent }
)(DecoratedForm);

// const DecoratedForm = reduxForm({
//   form: 'event'
// })(_EventForm);

// export const EventForm = connect(
//   mapStateToProps,
//   { createEvent, updateEvent }
// )(reduxForm<FormData, AllProps>({ form: 'eventForm' })(_EventForm));
