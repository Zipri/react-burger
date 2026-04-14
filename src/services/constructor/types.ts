import type { TID } from '@/api/base/types';
import type { TIngredient } from '@/api/ingredients/types';

export type TConstructorIngredient = TIngredient & {
  id: TID;
};
