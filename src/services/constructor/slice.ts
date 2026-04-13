import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
        return;
      }

      state.ingredients.push(ingredient);
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== ingredient._id
      );
    },
  },
});

export const { addIngredientToConstructor, removeIngredientFromConstructor } =
  constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
