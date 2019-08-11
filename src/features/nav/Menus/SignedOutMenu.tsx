import { Menu, Button } from 'semantic-ui-react';
import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../modals/modalActions';
import { ModalNames } from '../../modals/ModalManager';

export interface SignedOutMenuProps {
  handleLogIn(): void;
  openModal: typeof openModal;
}

const _SignedOutMenu: React.SFC<SignedOutMenuProps> = props => {
  return (
    <Menu.Item position='right'>
      <Button
        basic
        inverted
        content='Login'
        onClick={() => props.openModal({ modalType: ModalNames.LoginModal })}
      />
      <Button
        basic
        inverted
        content='Sign Up'
        onClick={() => props.openModal({ modalType: ModalNames.RegisterModal })}
      />
    </Menu.Item>
  );
};

const SignedOutMenu = connect(
  null,
  { openModal }
)(_SignedOutMenu);

export { SignedOutMenu };
