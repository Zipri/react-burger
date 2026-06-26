import { profileOrdersActions, profileOrdersSlice } from './slice';

import type { TFeedOrder } from '@/api/orders/types';

const profileOrder: TFeedOrder = {
  _id: 'profile-order-id-1',
  ingredients: ['bun-id', 'main-id'],
  status: 'pending',
  name: 'Персональный космобургер',
  number: 20202,
  createdAt: '2026-06-20T11:00:00.000Z',
  updatedAt: '2026-06-20T11:01:00.000Z',
};

describe('profileOrdersSlice reducer', () => {
  it('возвращает initial state', () => {
    const state = profileOrdersSlice.reducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isConnected: false,
      error: null,
    });
  });

  it('connect не меняет состояние напрямую', () => {
    const initialState = profileOrdersSlice.reducer(undefined, { type: '@@INIT' });
    const state = profileOrdersSlice.reducer(
      initialState,
      profileOrdersActions.connect()
    );

    expect(state).toEqual(initialState);
  });

  it('disconnect не меняет состояние напрямую', () => {
    const initialState = profileOrdersSlice.reducer(undefined, { type: '@@INIT' });
    const state = profileOrdersSlice.reducer(
      initialState,
      profileOrdersActions.disconnect()
    );

    expect(state).toEqual(initialState);
  });

  it('onOpen переводит сокет в connected и очищает ошибку', () => {
    const withErrorState = profileOrdersSlice.reducer(
      undefined,
      profileOrdersActions.onError('Ошибка профиля')
    );
    const state = profileOrdersSlice.reducer(
      withErrorState,
      profileOrdersActions.onOpen()
    );

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('onClose переводит сокет в disconnected', () => {
    const openedState = profileOrdersSlice.reducer(
      undefined,
      profileOrdersActions.onOpen()
    );
    const state = profileOrdersSlice.reducer(
      openedState,
      profileOrdersActions.onClose()
    );

    expect(state.isConnected).toBe(false);
  });

  it('onError сохраняет ошибку и переводит сокет в disconnected', () => {
    const openedState = profileOrdersSlice.reducer(
      undefined,
      profileOrdersActions.onOpen()
    );
    const state = profileOrdersSlice.reducer(
      openedState,
      profileOrdersActions.onError('Profile WS error')
    );

    expect(state.error).toBe('Profile WS error');
    expect(state.isConnected).toBe(false);
  });

  it('onMessage обновляет историю заказов, total и totalToday', () => {
    const state = profileOrdersSlice.reducer(
      undefined,
      profileOrdersActions.onMessage({
        orders: [profileOrder],
        total: 120,
        totalToday: 12,
      })
    );

    expect(state.orders).toEqual([profileOrder]);
    expect(state.total).toBe(120);
    expect(state.totalToday).toBe(12);
    expect(state.error).toBeNull();
  });
});
