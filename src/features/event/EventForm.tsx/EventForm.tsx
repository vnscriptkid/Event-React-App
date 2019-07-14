import React, { Component, ChangeEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

interface Props {
  handleFormToggle(): void;
  handleAddEvent(event: State): void;
  selectedEvent: State | null;
  handleUpdateEvent(event: State): void;
}

interface State {
  title: string;
  date: string;
  city: string;
  venue: string;
  host: string;
  id: string;
}

enum InputNames {
  title = 'title',
  date = 'date',
  city = 'city',
  venue = 'venue',
  host = 'host'
}

class EventForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      city: '',
      venue: '',
      host: '',
      id: ''
    };
  }

  componentDidMount() {
    if (this.props.selectedEvent) {
      const { title, date, city, venue, host, id } = this.props.selectedEvent;
      this.setState({ title, date, city, venue, host, id });
    }
  }

  handleFormSubmit = () => {
    if (!this.props.selectedEvent) {
      this.props.handleAddEvent(this.state);
    } else {
      this.props.handleUpdateEvent(this.state);
    }
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
          <Button type='button' onClick={this.props.handleFormToggle}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
