import type { TOrder } from '@/services/order/types';
import type { RootState } from '@/services/store';

export const selectOrderIsOpen = (state: RootState): boolean => state.order.isOpen;

export const selectOrder = (state: RootState): TOrder | null => state.order.order;

export const selectOrderLoading = (state: RootState): boolean => state.order.isLoading;
