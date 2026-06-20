import { fetchIngredients } from './actions';
import { ingredientsReducer } from './slice';

import type { TIngredient } from '@/api/ingredients/types';

const ingredientOne: TIngredient = {
  _id: 'ingredient-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'bun-image',
  image_large: 'bun-image-large',
  image_mobile: 'bun-image-mobile',
  __v: 0,
};

const ingredientTwo: TIngredient = {
  _id: 'ingredient-2',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 40,
  fat: 24,
  carbohydrates: 35,
  calories: 250,
  price: 80,
  image: 'sauce-image',
  image_large: 'sauce-image-large',
  image_mobile: 'sauce-image-mobile',
  __v: 0,
};

describe('ingredientsSlice reducer', () => {
  it('возвращает initial state', () => {
    const state = ingredientsReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: null,
    });
  });

  it('обрабатывает fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.items).toEqual([]);
  });

  it('обрабатывает fetchIngredients.fulfilled', () => {
    const payload: TIngredient[] = [ingredientOne, ingredientTwo];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload,
    };
    const state = ingredientsReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.items).toEqual(payload);
  });

  it('обрабатывает fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' },
    };
    const state = ingredientsReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
    expect(state.items).toEqual([]);
  });

  it('обрабатывает fetchIngredients.rejected без текста ошибки', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: undefined },
    };
    const state = ingredientsReducer(undefined, action);

    expect(state.error).toBe('Неизвестная ошибка');
  });
});
