import type { TID } from '@/api/base/types';

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
