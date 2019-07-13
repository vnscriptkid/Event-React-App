import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

interface Props {
  handleFormToggle(): void;
}

class EventForm extends Component<Props> {
  render() {
    return (
      <Segment>
        <Form>
          <Form.Field>
            <label htmlFor='eventTitle'>Event Title</label>
            <input id='eventTitle' placeholder='Event Title' />
          </Form.Field>
          <Form.Field>
            <label htmlFor='eventDate'>Event Date</label>
            <input id='eventDate' type='date' placeholder='Event Date' />
          </Form.Field>
          <Form.Field>
            <label htmlFor='eventCity'>City</label>
            <input id='eventCity' placeholder='City event is taking place' />
          </Form.Field>
          <Form.Field>
            <label htmlFor='eventVenue'>Event Venue</label>
            <input id='eventVenue' placeholder='Enter the Venue of the event' />
          </Form.Field>
          <Form.Field>
            <label htmlFor='hostName'>Hosted By</label>
            <input
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
