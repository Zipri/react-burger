import type { TIngredient, TIngredientType } from '@/api/ingredients/types';
import type { TIngredientsState } from '@/services/ingredients/slice';
import type { RootState } from '@/services/store';

export const selectIngredients = (state: RootState): TIngredientsState =>
  state.ingredients;

export const selectIngredientsItems = (state: RootState): TIngredient[] =>
  state.ingredients.items;

export const selectIngredientsGroupedByType = (
  state: RootState
): Record<TIngredientType, TIngredient[]> =>
  state.ingredients.items.reduce(
    (acc, ingredient) => {
      acc[ingredient.type] = [...(acc[ingredient.type] || []), ingredient];
      return acc;
    },
    {} as Record<TIngredientType, TIngredient[]>
  );

export const selectIngredientsLoading = (state: RootState): boolean =>
  state.ingredients.isLoading;

export const selectIngredientsError = (state: RootState): string | null =>
  state.ingredients.error;
