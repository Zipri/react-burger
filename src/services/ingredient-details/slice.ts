import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';
import {
  initialRequestState,
  type TRequestState,
} from '@/services/common/request-state';

type TIngredientDetailsState = TRequestState & {
  selectedIngredient: TIngredient | null;
};

const initialState: TIngredientDetailsState = {
  ...initialRequestState,
  selectedIngredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {},
});

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
