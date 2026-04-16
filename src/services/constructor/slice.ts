import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';
import type { TConstructorIngredient } from '@/services/constructor/types';

export type TMoveIngredientPayload = {
  fromIndex: number;
  toIndex: number;
};

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
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
      const id = nanoid();
      const ingredient = { ...action.payload, id };

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
        return;
      }

      state.ingredients.push(ingredient);
    },
    removeIngredientFromConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      state.ingredients = state.ingredients.filter((item) => item.id !== ingredient.id);
    },
    moveIngredientInConstructor: (
      state,
      action: PayloadAction<TMoveIngredientPayload>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex >= state.ingredients.length
      ) {
        return;
      }

      const [moved] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, moved);
    },
  },
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientInConstructor,
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
