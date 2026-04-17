import {
  initialRequestState,
  type TRequestState,
} from '@/services/common/request-state';

export type TModalState = TRequestState & {
  isOpen: boolean;
};

export const initialModalState: TModalState = {
  ...initialRequestState,
  isOpen: false,
};

export const openModal = (state: TModalState): void => {
  state.isOpen = true;
};

export const closeModal = (state: TModalState): void => {
  state.isOpen = false;
};
