import type { TID } from '@/api/base/types';

export type TOrderStatus = 'created' | 'pending' | 'done';

export type TCreateOrderRequest = {
  ingredients: TID[];
};

export type TCreateOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TFeedOrder = {
  _id: TID;
  ingredients: TID[];
  status: TOrderStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrdersFeedResponse = {
  success: boolean;
  orders: TFeedOrder[];
  total: number;
  totalToday: number;
  message?: string;
};

export type TOrderResponse = {
  success: boolean;
  orders: TFeedOrder[];
};
