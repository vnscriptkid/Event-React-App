import React, { Component, Fragment } from 'react';
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
import { withFirebase, WithFirebaseProps } from 'react-redux-firebase';

interface Props extends RouteComponentProps, WithFirebaseProps<void> {
  isAuthenticated: boolean;
  currentUser: null | string;
  signoutUser: typeof signoutUser;
}

export class _NavBar extends Component<Props> {
  handleSignout = (): void => {
    // this.props.signoutUser();
    this.props.firebase.logout(); // this is synchronous
    this.props.history.push('/');
  };

  render() {
    const { isAuthenticated, currentUser } = this.props;
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to='/events' name='Events' />
          {isAuthenticated && (
            <Fragment>
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
            </Fragment>
          )}
          {isAuthenticated ? (
            <SignedInMenu
              currentUser={currentUser}
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
  isAuthenticated: !!state.firebase.auth.uid,
  currentUser: state.firebase.auth.email,
  auth: state.firebase.auth
});

const NavBarWithRouter = withRouter(
  connect(
    mapState,
    { signoutUser: signoutUser }
  )(_NavBar)
);

export const NavBar = withFirebase<any>(NavBarWithRouter);

// export const NavBar = connect(
//   mapState,
//   { signoutUser: signoutUser }
// )(withFirebase(withRouter(_NavBar)));
