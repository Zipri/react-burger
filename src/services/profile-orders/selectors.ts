import type { TFeedOrder } from '@/api/orders/types';

import type { RootState } from '@/services/store';
import type { TProfileOrdersState } from './slice';

export const selectProfileOrders = (state: RootState): TProfileOrdersState =>
  state.profileOrders;

export const selectProfileOrdersItems = (state: RootState): TFeedOrder[] =>
  state.profileOrders.orders;

export const selectProfileOrdersIsConnected = (state: RootState): boolean =>
  state.profileOrders.isConnected;

export const selectProfileOrdersError = (state: RootState): string | null =>
  state.profileOrders.error;

export const selectProfileOrderByNumber = (
  state: RootState,
  orderNumber: number
): TFeedOrder | undefined =>
  state.profileOrders.orders.find((order) => order.number === orderNumber);
