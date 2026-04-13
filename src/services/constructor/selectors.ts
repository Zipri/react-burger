import type { TIngredient } from '@/api/ingredients/types';
import type { TConstructorState } from '@/services/constructor/slice';
import type { RootState } from '@/services/store';

export const selectConstructor = (state: RootState): TConstructorState =>
  state.burgerConstructor;

export const selectConstructorBun = (state: RootState): TIngredient | null =>
  state.burgerConstructor.bun;

export const selectConstructorIngredients = (state: RootState): TIngredient[] =>
  state.burgerConstructor.ingredients;

export const selectSelectedIngredients = (state: RootState): TIngredient[] =>
  state.burgerConstructor.bun
    ? [state.burgerConstructor.bun, ...state.burgerConstructor.ingredients]
    : state.burgerConstructor.ingredients;
