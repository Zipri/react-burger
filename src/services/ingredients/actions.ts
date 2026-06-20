import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TID } from '@/api/base/types';
import { ingredientsApi } from '@/api/ingredients';
import type { TIngredient } from '@/api/ingredients/types';

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchAll',
  async () => {
    return await ingredientsApi.getIngredients();
  }
);

export const fetchIngredientById = createAsyncThunk<TIngredient, TID>(
  'ingredients/fetchById',
  async (id: TID) => {
    const ingredients = await ingredientsApi.getIngredients();

    const ingredient = ingredients.find((item) => item._id === id);
    if (!ingredient) {
      throw new Error('Ingredient not found');
    }

    return ingredient;
  }
);
