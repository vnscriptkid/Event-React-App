import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from './modalActions';

export interface TestModalProps {
  closeModal: typeof closeModal;
}

const _TestModal: React.SFC<TestModalProps> = props => {
  return (
    <Modal onClose={props.closeModal} closeIcon='close' open={true}>
      <Modal.Header>Test Modal</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Something interesting is presented here!</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const TestModal = connect(
  null,
  { closeModal }
)(_TestModal);

export { TestModal };
