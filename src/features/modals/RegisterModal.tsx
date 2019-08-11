import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from './modalActions';
import { RegisterForm } from '../auth/Register/RegisterForm';

export interface RegisterModalProps {
  closeModal: typeof closeModal;
}

const _RegisterModal: React.SFC<RegisterModalProps> = props => {
  return (
    <Modal onClose={props.closeModal} size='mini' open={true}>
      <Modal.Header>Register</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <RegisterForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const RegisterModal = connect(
  null,
  { closeModal }
)(_RegisterModal);

export { RegisterModal };
