import { BaseApi } from '@api/base';

import type { TIngredient } from './types';
import type { TIngredientsResponse } from './types';

class IngredientsApi extends BaseApi {
  constructor() {
    super('/ingredients');
  }

  public async getIngredients(): Promise<TIngredient[]> {
    const response = await this.request<TIngredientsResponse>();
    return response.data;
  }
}

export const ingredientsApi = new IngredientsApi();
