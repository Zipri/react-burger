import { createSelector } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';
import type { TConstructorState } from '@/services/constructor/slice';
import type { RootState } from '@/services/store';

export const selectConstructor = (state: RootState): TConstructorState =>
  state.burgerConstructor;

export const selectConstructorBun = (state: RootState): TIngredient | null =>
  state.burgerConstructor.bun;

export const selectConstructorIngredients = (state: RootState): TIngredient[] =>
  state.burgerConstructor.ingredients;

export const selectConstructorTotalPrice = (state: RootState): number =>
  state.burgerConstructor.bun
    ? state.burgerConstructor.bun.price * 2 +
      state.burgerConstructor.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      )
    : 0;

export const selectConstructorCanOrder = (state: RootState): boolean =>
  Boolean(state.burgerConstructor.bun) && state.burgerConstructor.ingredients.length > 0;

export const selectSelectedIngredients = (state: RootState): TIngredient[] =>
  state.burgerConstructor.bun
    ? [state.burgerConstructor.bun, ...state.burgerConstructor.ingredients]
    : state.burgerConstructor.ingredients;

export const selectIngredientsCountMap = createSelector(
  [selectSelectedIngredients],
  (selectedIngredients): Record<string, number> => {
    const map: Record<string, number> = {};
    selectedIngredients.forEach((ingredient) => {
      if (ingredient.type !== 'bun') {
        map[ingredient._id] = (map[ingredient._id] ?? 0) + 1;
      }
    });

    const bun = selectedIngredients.find((ingredient) => ingredient.type === 'bun');
    if (bun) {
      map[bun._id] = 2;
    }

    return map;
  }
);
