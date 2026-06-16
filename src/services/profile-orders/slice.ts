import { createSlice } from '@reduxjs/toolkit';

import type { TFeedOrder } from '@/api/orders/types';

export type TProfileOrdersState = {
  orders: TFeedOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null,
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    connect: () => {},
    disconnect: () => {},
    onOpen: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    onClose: (state) => {
      state.isConnected = false;
    },
    onError: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.isConnected = false;
    },
    onMessage: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.error = null;
    },
  },
});

export const profileOrdersActions = profileOrdersSlice.actions;
