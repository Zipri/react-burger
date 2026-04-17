import type { TIngredient } from '@/api/ingredients/types';
import type { TIngredientDetailsState } from '@/services/ingredient-details/slice';
import type { RootState } from '@/services/store';

export const selectIngredientDetailsState = (
  state: RootState
): TIngredientDetailsState => state.ingredientDetails;

export const selectIngredientDetailsIsOpen = (state: RootState): boolean =>
  state.ingredientDetails.isOpen;

export const selectIngredientDetailsSelectedIngredient = (
  state: RootState
): TIngredient | null => state.ingredientDetails.ingredient;

export const selectIngredientDetailsLoading = (state: RootState): boolean =>
  state.ingredientDetails.isLoading;
