import { Menu, Button } from 'semantic-ui-react';
import React from 'react';

export interface SignedOutMenuProps {
  handleLogIn(): void;
}

const SignedOutMenu: React.SFC<SignedOutMenuProps> = props => {
  return (
    <Menu.Item position='right'>
      <Button basic inverted content='Login' onClick={props.handleLogIn} />
      <Button basic inverted content='Sign Up' />
    </Menu.Item>
  );
};

export { SignedOutMenu };
