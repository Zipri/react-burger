import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

import type { TOrdersFeedResponse } from '@/api/orders/types';

export type TWsActions = {
  connect: ActionCreatorWithoutPayload<string>;
  disconnect: ActionCreatorWithoutPayload<string>;
  onOpen: ActionCreatorWithoutPayload<string>;
  onClose: ActionCreatorWithoutPayload<string>;
  onError: ActionCreatorWithPayload<string, string>;
  onMessage: ActionCreatorWithPayload<TOrdersFeedResponse, string>;
};

export type TCreateWebSocketMiddlewareOptions = {
  actions: TWsActions;
  getUrl: () => string | null;
  refreshToken?: () => Promise<boolean>;
};
