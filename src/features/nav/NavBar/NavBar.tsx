import React, { Component } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import {
  NavLink,
  withRouter,
  RouteComponentProps,
  Link
} from 'react-router-dom';
import { SignedInMenu } from '../Menus/SignedInMenu';
import { SignedOutMenu } from '../Menus/SignedOutMenu';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { signoutUser } from '../../auth/authActions';

interface Props extends RouteComponentProps {
  isAuthenticated: boolean;
  currentUser: null | string;
  signoutUser: typeof signoutUser;
}

export class _NavBar extends Component<Props> {
  handleSignout = (): void => {
    this.props.signoutUser();
    this.props.history.push('/');
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
              as={Link}
              to='/createEvent'
              floated='right'
              positive
              inverted
              content='Create Event'
            />
          </Menu.Item>
          {this.props.isAuthenticated ? (
            <SignedInMenu
              currentUser={this.props.currentUser}
              handleLogout={this.handleSignout}
            />
          ) : (
            <SignedOutMenu handleLogIn={() => {}} />
          )}
        </Container>
      </Menu>
    );
  }
}

const mapState = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.currentUser
});

export const NavBar = connect(
  mapState,
  { signoutUser: signoutUser }
)(withRouter(_NavBar));
