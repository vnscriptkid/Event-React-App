import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';
import { Attendee } from '../eventContants';
import { Link } from 'react-router-dom';

interface Props {
  attendee: Attendee;
}

class EventListAttendee extends Component<Props> {
  render() {
    const { photoURL, id } = this.props.attendee;
    return (
      <List.Item>
        <Image
          as={Link}
          to={`/profile/${id}`}
          size='mini'
          circular
          src={photoURL}
        />
      </List.Item>
    );
  }
}

export default EventListAttendee;
