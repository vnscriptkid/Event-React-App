import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from './modalActions';
import { LoginForm } from '../auth/Login/LoginForm';

export interface LoginModalProps {
  closeModal: typeof closeModal;
}

const _LoginModal: React.SFC<LoginModalProps> = props => {
  return (
    <Modal onClose={props.closeModal} size='mini' open={true}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const LoginModal = connect(
  null,
  { closeModal }
)(_LoginModal);

export { LoginModal };
