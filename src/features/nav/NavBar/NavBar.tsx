import React, { Component } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { SignedInMenu } from '../Menus/SignedInMenu';
import { SignedOutMenu } from '../Menus/SignedOutMenu';

interface State {
  isAuthenticated: boolean;
}

interface Props extends RouteComponentProps {}

export class _NavBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  toggleAuth = (): void => {
    this.setState(
      prevState => ({
        isAuthenticated: !prevState.isAuthenticated
      }),
      () => {
        if (!this.state.isAuthenticated) {
          this.props.history.push('/');
        }
      }
    );
  };

  render() {
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to='/events' name='Events' />
          <Menu.Item as={NavLink} to='/people' name='People' />
          <Menu.Item as={NavLink} to='/test' name='Test' />
          <Menu.Item>
            <Button
              as={NavLink}
              to='/createEvent'
              floated='right'
              positive
              inverted
              content='Create Event'
            />
          </Menu.Item>
          {this.state.isAuthenticated ? (
            <SignedInMenu handleLogout={this.toggleAuth} />
          ) : (
            <SignedOutMenu handleLogIn={this.toggleAuth} />
          )}
        </Container>
      </Menu>
    );
  }
}

export const NavBar = withRouter(_NavBar);
