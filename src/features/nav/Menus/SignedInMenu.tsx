import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export interface SignedInMenuProps {
  handleLogout(): void;
}

const SignedInMenu: React.SFC<SignedInMenuProps> = props => {
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src='https://randomuser.me/api/portraits/men/62.jpg'
      />
      <Dropdown pointing='top left' text='@vnscriptkid'>
        <Dropdown.Menu>
          <Dropdown.Item text='Create Event' icon='plus' />
          <Dropdown.Item text='My Events' icon='calendar' />
          <Dropdown.Item text='My Network' icon='users' />
          <Dropdown.Item text='My Profile' icon='user' />
          <Dropdown.Item
            as={NavLink}
            to='/settings'
            text='Settings'
            icon='settings'
          />
          <Dropdown.Item
            text='Sign Out'
            icon='power'
            onClick={props.handleLogout}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export { SignedInMenu };
