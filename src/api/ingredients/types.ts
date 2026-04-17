import type { TID } from '@/api/base/types';

export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TIngredient = {
  _id: TID;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};
