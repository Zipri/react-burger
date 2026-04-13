import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';
import {
  initialRequestState,
  type TRequestState,
} from '@/services/common/request-state';

type TConstructorState = TRequestState & {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorState = {
  ...initialRequestState,
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {},
});

export const constructorReducer = constructorSlice.reducer;
