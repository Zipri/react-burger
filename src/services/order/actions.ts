import { createAsyncThunk } from '@reduxjs/toolkit';

import { ordersApi } from '@/api/orders';
import type { TOrder } from '@/services/order/types';
import type { RootState } from '@/services/store';

export const createOrder = createAsyncThunk<
  TOrder,
  void,
  { state: RootState; rejectValue: string }
>('order/createOrder', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const bun = state.burgerConstructor.bun;
  const ingredients = state.burgerConstructor.ingredients;

  if (!bun) {
    return thunkApi.rejectWithValue('Выберите булку');
  }

  const ingredientIds = [bun._id, ...ingredients.map((item) => item._id), bun._id];

  try {
    const response = await ordersApi.createOrder({ ingredients: ingredientIds });
    return {
      name: response.name,
      number: response.order.number,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ошибка создания заказа';
    return thunkApi.rejectWithValue(message);
  }
});
