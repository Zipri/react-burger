import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';
import {
  initialRequestState,
  type TRequestState,
} from '@/services/common/request-state';

type TIngredientsState = TRequestState & {
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
});

export const ingredientsReducer = ingredientsSlice.reducer;
