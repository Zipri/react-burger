import {
  closeIngredientDetails,
  failIngredientImageLoading,
  finishIngredientImageLoading,
  ingredientDetailsReducer,
  openIngredientDetails,
  setIngredientDetails,
  startIngredientImageLoading,
} from './slice';

import type { TIngredient } from '@/api/ingredients/types';

const ingredient: TIngredient = {
  _id: 'ingredient-id',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'ingredient-image',
  image_large: 'ingredient-image-large',
  image_mobile: 'ingredient-image-mobile',
  __v: 0,
};

describe('ingredientDetailsSlice reducer', () => {
  it('возвращает initial state', () => {
    const state = ingredientDetailsReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      ingredient: null,
      isOpen: false,
      isLoading: false,
      error: null,
    });
  });

  it('openIngredientDetails сохраняет ингредиент и открывает модалку', () => {
    const state = ingredientDetailsReducer(undefined, openIngredientDetails(ingredient));

    expect(state.ingredient).toEqual(ingredient);
    expect(state.isOpen).toBe(true);
  });

  it('startIngredientImageLoading включает isLoading и очищает error', () => {
    const preloadedState = ingredientDetailsReducer(
      undefined,
      failIngredientImageLoading('Ошибка загрузки')
    );
    const state = ingredientDetailsReducer(
      preloadedState,
      startIngredientImageLoading()
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('setIngredientDetails сохраняет ингредиент и сбрасывает request-state', () => {
    const withErrorState = ingredientDetailsReducer(
      undefined,
      failIngredientImageLoading('Ошибка загрузки')
    );
    const state = ingredientDetailsReducer(
      withErrorState,
      setIngredientDetails(ingredient)
    );

    expect(state.ingredient).toEqual(ingredient);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('finishIngredientImageLoading выключает isLoading', () => {
    const loadingState = ingredientDetailsReducer(
      undefined,
      startIngredientImageLoading()
    );
    const state = ingredientDetailsReducer(loadingState, finishIngredientImageLoading());

    expect(state.isLoading).toBe(false);
  });

  it('failIngredientImageLoading сохраняет переданную ошибку', () => {
    const state = ingredientDetailsReducer(
      undefined,
      failIngredientImageLoading('Не удалось загрузить изображение')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить изображение');
  });

  it('failIngredientImageLoading ставит дефолтную ошибку при undefined', () => {
    const state = ingredientDetailsReducer(
      undefined,
      failIngredientImageLoading(undefined)
    );

    expect(state.error).toBe('Неизвестная ошибка');
  });

  it('closeIngredientDetails очищает ingredient, закрывает модалку и сбрасывает request-state', () => {
    const openedState = ingredientDetailsReducer(
      undefined,
      openIngredientDetails(ingredient)
    );
    const withLoadingState = ingredientDetailsReducer(
      openedState,
      startIngredientImageLoading()
    );
    const closedState = ingredientDetailsReducer(
      withLoadingState,
      closeIngredientDetails()
    );

    expect(closedState.ingredient).toBeNull();
    expect(closedState.isOpen).toBe(false);
    expect(closedState.isLoading).toBe(false);
    expect(closedState.error).toBeNull();
  });
});
