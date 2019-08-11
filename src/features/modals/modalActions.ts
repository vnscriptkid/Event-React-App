import { ModalActionTypes } from './modalConstants';

// Open Modal
export interface OpenModalAction {
  type: ModalActionTypes.OpenModal;
  payload: {
    modalType: string;
    modalProps: any;
  };
}

export const openModal = ({ modalType, modalProps }: any): OpenModalAction => ({
  type: ModalActionTypes.OpenModal,
  payload: {
    modalType,
    modalProps
  }
});

// Close Modal
export interface CloseModalAction {
  type: ModalActionTypes.CloseModal;
}

export const closeModal = (): CloseModalAction => ({
  type: ModalActionTypes.CloseModal
});

export type ModalAction = OpenModalAction | CloseModalAction;
