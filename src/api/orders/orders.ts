import type {
  TCreateOrderRequest,
  TCreateOrderResponse,
  TFeedOrder,
  TOrderResponse,
} from './types';

import { BaseApi } from '@/api/base';

class OrdersApi extends BaseApi {
  constructor() {
    super('/orders');
  }

  public async createOrder(data: TCreateOrderRequest): Promise<TCreateOrderResponse> {
    return await this.post<TCreateOrderResponse, TCreateOrderRequest>(data);
  }

  public async getOrderByNumber(number: number): Promise<TFeedOrder> {
    const response = await this.get<TOrderResponse>(`/${number}`, {}, { auth: false });
    const order = response.orders[0];

    if (!order) {
      throw new Error(`Order ${number} not found`);
    }

    return order;
  }
}

export const ordersApi = new OrdersApi();
