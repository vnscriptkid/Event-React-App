import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';
import { Attendee } from '../eventContants';

interface Props {
  attendee: Attendee;
}

class EventListAttendee extends Component<Props> {
  render() {
    const { photoURL } = this.props.attendee;
    return (
      <List.Item>
        <Image as='a' size='mini' circular src={photoURL} />
      </List.Item>
    );
  }
}

export default EventListAttendee;
