import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';
import {
  finishLoading,
  initialRequestState,
  setRequestError,
  startLoading,
  type TRequestState,
} from '@/services/common/request-state';
import { fetchIngredients } from '@/services/ingredients/actions';

export type TIngredientsState = TRequestState & {
  items: TIngredient[];
};

const initialState: TIngredientsState = {
  ...initialRequestState,
  items: [],
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        startLoading(state);
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        finishLoading(state);
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        setRequestError(state, action.error.message);
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
