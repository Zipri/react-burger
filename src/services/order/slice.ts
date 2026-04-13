import { createSlice } from '@reduxjs/toolkit';

import {
  initialRequestState,
  type TRequestState,
} from '@/services/common/request-state';

type TOrderState = TRequestState & {
  orderNumber: string | null;
};

const initialState: TOrderState = {
  ...initialRequestState,
  orderNumber: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});

export const orderReducer = orderSlice.reducer;
