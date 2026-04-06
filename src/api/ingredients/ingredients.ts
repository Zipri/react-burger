import { BaseApi } from '@api/base';

import type { TIngredient } from './types';
import type { TIngredientsResponse } from './types';

class IngredientsApi extends BaseApi {
  constructor() {
    super('/ingredients');
  }

  public async getIngredients(): Promise<TIngredient[]> {
    const response = await this.request<TIngredientsResponse>();

    if (!response.success) {
      throw new Error('API returned unsuccessful response');
    }

    return response.data;
  }
}

export const ingredientsApi = new IngredientsApi();
