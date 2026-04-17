import { createAsyncThunk } from '@reduxjs/toolkit';

import { ingredientsApi } from '@/api/ingredients';
import type { TIngredient } from '@/api/ingredients/types';

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchAll',
  async () => {
    return await ingredientsApi.getIngredients();
  }
);
