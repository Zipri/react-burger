import { createSlice } from '@reduxjs/toolkit';

import {
  closeModal,
  initialModalState,
  openModal,
  type TModalState,
} from '@/services/common/modal-state';
import {
  finishLoading,
  resetRequestState,
  setRequestError,
  startLoading,
} from '@/services/common/request-state';
import { createOrder } from '@/services/order/actions';
import type { TOrder } from '@/services/order/types';

export type TOrderState = TModalState & {
  order: TOrder | null;
};

const initialState: TOrderState = {
  ...initialModalState,
  order: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderDetails: (state) => {
      state.order = null;
      resetRequestState(state);
      closeModal(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        startLoading(state);
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        finishLoading(state);
        state.order = action.payload;
        openModal(state);
      })
      .addCase(createOrder.rejected, (state, action) => {
        setRequestError(state, action.payload ?? action.error.message);
      });
  },
});

export const { closeOrderDetails } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
