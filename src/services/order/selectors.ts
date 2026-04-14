import type { RootState } from '@/services/store';

export const selectOrderIsOpen = (state: RootState): boolean => state.order.isOpen;

export const selectOrderNumber = (state: RootState): string | null =>
  state.order.orderNumber;

export const selectOrderLoading = (state: RootState): boolean => state.order.isLoading;
