import { configureStore } from '@reduxjs/toolkit';

import { WS_BASE_URL } from '@/api/base';
import { authStorage } from '@/utils';

import { feedActions } from './feed';
import { profileOrdersActions } from './profile-orders';
import { rootReducer } from './root-reducer';
import { createWebSocketMiddleware } from './websockets/middleware';

const feedMiddleware = createWebSocketMiddleware({
  actions: feedActions,
  getUrl: () => `${WS_BASE_URL}/all`,
});

const profileOrdersMiddleware = createWebSocketMiddleware({
  actions: profileOrdersActions,
  getUrl: () => {
    const accessToken = authStorage.getAccessToken()?.replace('Bearer ', '');

    return accessToken ? `${WS_BASE_URL}?token=${accessToken}` : null;
  },
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedMiddleware, profileOrdersMiddleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
