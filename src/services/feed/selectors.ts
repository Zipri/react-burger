import type { TFeedState } from './slice';

import type { TFeedOrder } from '@/api/orders/types';
import type { RootState } from '@/services/store';
import { getOrderNumberColumns } from '@/utils/helpers/orders';

export const selectFeed = (state: RootState): TFeedState => state.feed;

export const selectFeedOrders = (state: RootState): TFeedOrder[] => state.feed.orders;

export const selectFeedTotal = (state: RootState): number => state.feed.total;

export const selectFeedTotalToday = (state: RootState): number => state.feed.totalToday;

export const selectFeedIsConnected = (state: RootState): boolean =>
  state.feed.isConnected;

export const selectFeedError = (state: RootState): string | null => state.feed.error;

export const selectFeedOrderByNumber = (
  state: RootState,
  orderNumber: number
): TFeedOrder | undefined =>
  state.feed.orders.find((order) => order.number === orderNumber);

export const selectFeedDoneOrderNumberColumns = (state: RootState): number[][] =>
  getOrderNumberColumns(state.feed.orders, ['done']);

export const selectFeedInProgressOrderNumberColumns = (state: RootState): number[][] =>
  getOrderNumberColumns(state.feed.orders, ['created', 'pending']);
