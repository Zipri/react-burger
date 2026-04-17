import {
  failIngredientImageLoading,
  finishIngredientImageLoading,
  openIngredientDetails,
  startIngredientImageLoading,
} from './slice';

import type { TIngredient } from '@/api/ingredients/types';
import type { AppDispatch } from '@/services/store';

export const openIngredientDetailsWithPreload =
  (ingredient: TIngredient) =>
  (dispatch: AppDispatch): void => {
    dispatch(openIngredientDetails(ingredient));
    dispatch(startIngredientImageLoading());

    const image = new Image();
    image.src = ingredient.image_large;

    image.onload = () => {
      dispatch(finishIngredientImageLoading());
    };

    image.onerror = () => {
      dispatch(failIngredientImageLoading('Ошибка загрузки изображения'));
    };
  };
