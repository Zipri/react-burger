import type { Middleware } from '@reduxjs/toolkit';

import type { TCreateWebSocketMiddlewareOptions } from './types';

import type { TOrdersFeedResponse } from '@/api/orders/types';

type TWsErrorResponse = {
  success: false;
  message?: string;
};

type TWsResponse = TOrdersFeedResponse | TWsErrorResponse;

const INVALID_TOKEN_MESSAGE = 'Invalid or missing token';

export const createWebSocketMiddleware = ({
  actions,
  getUrl,
  refreshToken,
}: TCreateWebSocketMiddlewareOptions): Middleware => {
  let socket: WebSocket | null = null;
  let isRefreshingToken = false;

  const closeSocket = () => {
    socket?.close();
    socket = null;
  };

  return (store) => {
    const connectSocket = () => {
      const url = getUrl();

      if (!url) {
        store.dispatch(actions.onError('WebSocket URL is empty'));
        return;
      }

      closeSocket();
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

      socket.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data as string) as TWsResponse;

          if (!data.success) {
            if (
              data.message === INVALID_TOKEN_MESSAGE &&
              refreshToken &&
              !isRefreshingToken
            ) {
              isRefreshingToken = true;

              const isTokenRefreshed = await refreshToken();

              isRefreshingToken = false;

              if (isTokenRefreshed) {
                connectSocket();
                return;
              }
            }

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
    };

    return (next) => (action) => {
      if (actions.connect.match(action)) {
        connectSocket();
      }

      if (actions.disconnect.match(action)) {
        closeSocket();
      }

      return next(action);
    };
  };
};
