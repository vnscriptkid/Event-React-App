import React from 'react';
import { Fragment } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export interface SettingsNavProps {}

const SettingsNav: React.SFC<SettingsNavProps> = () => {
  return (
    <Fragment>
      <Menu vertical>
        <Header content='Profile' color='grey' icon='user' inverted attached />
        <Menu.Item as={NavLink} to='/settings/basics'>
          Basics
        </Menu.Item>
        <Menu.Item as={NavLink} to='/settings/about'>
          About
        </Menu.Item>
        <Menu.Item as={NavLink} to='/settings/photos'>
          My Photos
        </Menu.Item>
      </Menu>
      <Menu vertical>
        <Header
          content='Account'
          color='grey'
          icon='settings'
          inverted
          attached
        />
        <Menu.Item as={NavLink} to='/settings/account'>
          My Account
        </Menu.Item>
      </Menu>
    </Fragment>
  );
};

export { SettingsNav };
