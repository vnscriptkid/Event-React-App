import { ModalAction } from './modalActions';
import { ModalActionTypes } from './modalConstants';

export const modalReducer = (state = null, action: ModalAction) => {
  switch (action.type) {
    case ModalActionTypes.OpenModal:
      const { modalProps, modalType } = action.payload;
      return {
        modalType,
        modalProps
      };
    case ModalActionTypes.CloseModal:
      return null;
  }
  return state;
};
