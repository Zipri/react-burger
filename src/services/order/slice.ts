import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  closeModal,
  initialModalState,
  openModal,
  type TModalState,
} from '@/services/common/modal-state';
import { resetRequestState } from '@/services/common/request-state';

export type TOrderState = TModalState & {
  orderNumber: string | null;
};

const initialState: TOrderState = {
  ...initialModalState,
  orderNumber: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openOrderDetails: (state, action: PayloadAction<string | null | undefined>) => {
      state.orderNumber = action.payload ?? null;
      openModal(state);
    },
    closeOrderDetails: (state) => {
      state.orderNumber = null;
      resetRequestState(state);
      closeModal(state);
    },
  },
});

export const { openOrderDetails, closeOrderDetails } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
