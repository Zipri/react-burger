import { feedActions, feedSlice } from './slice';

import type { TFeedOrder } from '@/api/orders/types';

const feedOrder: TFeedOrder = {
  _id: 'order-id-1',
  ingredients: ['bun-id', 'main-id', 'sauce-id'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  number: 10101,
  createdAt: '2026-06-20T10:00:00.000Z',
  updatedAt: '2026-06-20T10:01:00.000Z',
};

describe('feedSlice reducer', () => {
  it('возвращает initial state', () => {
    const state = feedSlice.reducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isConnected: false,
      error: null,
    });
  });

  it('connect не меняет состояние напрямую', () => {
    const initialState = feedSlice.reducer(undefined, { type: '@@INIT' });
    const state = feedSlice.reducer(initialState, feedActions.connect());

    expect(state).toEqual(initialState);
  });

  it('disconnect не меняет состояние напрямую', () => {
    const initialState = feedSlice.reducer(undefined, { type: '@@INIT' });
    const state = feedSlice.reducer(initialState, feedActions.disconnect());

    expect(state).toEqual(initialState);
  });

  it('onOpen переводит сокет в connected и очищает ошибку', () => {
    const withErrorState = feedSlice.reducer(
      undefined,
      feedActions.onError('Ошибка сокета')
    );
    const state = feedSlice.reducer(withErrorState, feedActions.onOpen());

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('onClose переводит сокет в disconnected', () => {
    const openedState = feedSlice.reducer(undefined, feedActions.onOpen());
    const state = feedSlice.reducer(openedState, feedActions.onClose());

    expect(state.isConnected).toBe(false);
  });

  it('onError сохраняет ошибку и переводит сокет в disconnected', () => {
    const openedState = feedSlice.reducer(undefined, feedActions.onOpen());
    const state = feedSlice.reducer(
      openedState,
      feedActions.onError('WebSocket disconnected')
    );

    expect(state.error).toBe('WebSocket disconnected');
    expect(state.isConnected).toBe(false);
  });

  it('onMessage обновляет ленту заказов, total и totalToday', () => {
    const state = feedSlice.reducer(
      undefined,
      feedActions.onMessage({
        orders: [feedOrder],
        total: 420,
        totalToday: 42,
      })
    );

    expect(state.orders).toEqual([feedOrder]);
    expect(state.total).toBe(420);
    expect(state.totalToday).toBe(42);
    expect(state.error).toBeNull();
  });
});
