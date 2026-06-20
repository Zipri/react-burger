import { createOrder } from './actions';
import { closeOrderDetails, orderReducer } from './slice';
import type { TOrder } from './types';

const createdOrder: TOrder = {
  name: 'Флюоресцентный space бургер',
  number: 12345,
};

describe('orderSlice reducer', () => {
  it('возвращает initial state', () => {
    const state = orderReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      order: null,
      isOpen: false,
      isLoading: false,
      error: null,
    });
  });

  it('closeOrderDetails очищает заказ, закрывает модалку и сбрасывает request-state', () => {
    const withOrderAction = {
      type: createOrder.fulfilled.type,
      payload: createdOrder,
    };
    const openedState = orderReducer(undefined, withOrderAction);
    const state = orderReducer(openedState, closeOrderDetails());

    expect(state.order).toBeNull();
    expect(state.isOpen).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('обрабатывает createOrder.pending', () => {
    const withErrorAction = {
      type: createOrder.rejected.type,
      payload: 'Ошибка заказа',
      error: { message: 'Ошибка заказа' },
    };
    const stateWithError = orderReducer(undefined, withErrorAction);
    const pendingAction = { type: createOrder.pending.type };
    const state = orderReducer(stateWithError, pendingAction);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: createdOrder,
    };
    const state = orderReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isOpen).toBe(true);
    expect(state.order).toEqual(createdOrder);
  });

  it('обрабатывает createOrder.rejected с payload ошибкой', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Не удалось создать заказ',
      error: { message: 'Internal error' },
    };
    const state = orderReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось создать заказ');
  });

  it('обрабатывает createOrder.rejected без payload и с error.message', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: undefined,
      error: { message: 'Ошибка из error.message' },
    };
    const state = orderReducer(undefined, action);

    expect(state.error).toBe('Ошибка из error.message');
  });

  it('обрабатывает createOrder.rejected без payload и без error.message', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: undefined,
      error: { message: undefined },
    };
    const state = orderReducer(undefined, action);

    expect(state.error).toBe('Неизвестная ошибка');
  });
});
