import type { Middleware } from '@reduxjs/toolkit';

import type { TOrdersFeedResponse } from '@/api/orders/types';
import type { TCreateWebSocketMiddlewareOptions } from './types';

export const createWebSocketMiddleware = ({
  actions,
  getUrl,
}: TCreateWebSocketMiddlewareOptions): Middleware => {
  let socket: WebSocket | null = null;

  return (store) => (next) => (action) => {
    if (actions.connect.match(action)) {
      const url = getUrl();

      if (!url) {
        store.dispatch(actions.onError('WebSocket URL is empty'));
        return next(action);
      }

      socket?.close();
      socket = new WebSocket(url);

      socket.onopen = () => {
        store.dispatch(actions.onOpen());
      };

      socket.onclose = () => {
        store.dispatch(actions.onClose());
      };

      socket.onerror = () => {
        store.dispatch(actions.onError('Ошибка соединения с WebSocket'));
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string) as TOrdersFeedResponse;

          if (!data.success) {
            store.dispatch(
              actions.onError(data.message ?? 'Ошибка ответа от WebSocket')
            );
            return;
          }

          store.dispatch(actions.onMessage(data));
        } catch {
          store.dispatch(actions.onError('Ошибка парсинга сообщения от WebSocket'));
        }
      };
    }

    if (actions.disconnect.match(action)) {
      socket?.close();
      socket = null;
    }

    return next(action);
  };
};
