import React, { Component } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';

export class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item header>Re-vents</Menu.Item>
          <Menu.Item name='Events' />
          <Menu.Item>
            <Button floated='right' positive inverted content='Create Event' />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button basic inverted content='Login' />
            <Button basic inverted content='Sign Out' />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
