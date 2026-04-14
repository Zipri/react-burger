import type { TCreateOrderRequest, TCreateOrderResponse } from './types';

import { BaseApi } from '@/api/base';

class OrdersApi extends BaseApi {
  constructor() {
    super('/orders');
  }

  public async createOrder(data: TCreateOrderRequest): Promise<TCreateOrderResponse> {
    return await this.post<TCreateOrderResponse, TCreateOrderRequest>(data);
  }
}

export const ordersApi = new OrdersApi();
