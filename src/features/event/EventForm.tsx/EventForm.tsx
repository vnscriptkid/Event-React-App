import React, { Component, ChangeEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { createEvent, updateEvent } from '../eventActions';
import { Event } from '../eventContants';

interface Props extends RouteComponentProps {
  event: {
    title: string;
    date: string;
    city: string;
    venue: string;
    host: string;
    id: string;
  };
  edit: boolean;
  createEvent: typeof createEvent;
  updateEvent: typeof updateEvent;
}

interface State {
  title: string;
  date: string;
  city: string;
  venue: string;
  host: string;
}

enum InputNames {
  title = 'title',
  date = 'date',
  city = 'city',
  venue = 'venue',
  host = 'host'
}

class _EventForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { title, date, city, venue, host } = this.props.event;
    this.state = { title, date, city, venue, host };
  }

  handleFormSubmit = () => {
    if (this.props.edit) {
      this.props.updateEvent(this.props.event.id, this.state as Event);
    } else {
      this.props.createEvent(this.state as Event);
    }
    this.props.history.push('/events');
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as InputNames;
    const value = e.target.value;
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  render() {
    const { city, date, title, venue, host } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label htmlFor='eventTitle'>Event Title</label>
            <input
              name={InputNames.title}
              value={title}
              onChange={this.handleInputChange}
              id='eventTitle'
              placeholder='Event Title'
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='eventDate'>Event Date</label>
            <input
              name={InputNames.date}
              value={date}
              onChange={this.handleInputChange}
              id='eventDate'
              type='date'
              placeholder='Event Date'
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='eventCity'>City</label>
            <input
              name={InputNames.city}
              value={city}
              onChange={this.handleInputChange}
              id='eventCity'
              placeholder='City event is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='eventVenue'>Event Venue</label>
            <input
              name={InputNames.venue}
              value={venue}
              onChange={this.handleInputChange}
              id='eventVenue'
              placeholder='Enter the Venue of the event'
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='hostName'>Hosted By</label>
            <input
              name={InputNames.host}
              value={host}
              onChange={this.handleInputChange}
              id='hostName'
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button type='button' onClick={() => this.props.history.goBack()}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
  ownProps: RouteComponentProps<{ id: string }>
) => {
  const defaultEvent = {
    title: '',
    date: '',
    city: '',
    venue: '',
    host: '',
    id: ''
  };
  let edit = false;
  const id = ownProps.match.params.id;
  const foundEvent = state.events.find(event => event.id === id);
  if (id && foundEvent) {
    const { title, date, city, venue, host, id } = foundEvent;
    return { event: { title, date, city, venue, host, id }, edit: true };
  }
  return { event: defaultEvent, edit };
};

export const EventForm = connect(
  mapStateToProps,
  { createEvent, updateEvent }
)(_EventForm);
