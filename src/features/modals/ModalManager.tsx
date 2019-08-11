import * as React from 'react';
import { TestModal } from './TestModal';
import { StoreState } from '../../app/reducers';
import { connect } from 'react-redux';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';

export enum ModalNames {
  TestModal = 'TestModal',
  LoginModal = 'LoginModal',
  RegisterModal = 'RegisterModal'
}

export interface ModalManagerProps {
  modal: null | { modalType: ModalNames; modalProps: any };
}

const mapStateToProps = (state: StoreState) => ({
  modal: state.modals
});

const ModalLookup: any = {
  TestModal,
  LoginModal,
  RegisterModal
};

const _ModalManager: React.SFC<ModalManagerProps> = props => {
  let renderedModal = null;
  if (props.modal) {
    const Modal = ModalLookup[props.modal.modalType];
    if (!Modal) {
      throw new Error('Modal Name does not exist in Modal Lookup');
    }
    renderedModal = <Modal />;
  }

  return renderedModal;
};

const ModalManager = connect(mapStateToProps)(_ModalManager);

export { ModalManager };
