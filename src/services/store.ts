import { configureStore } from '@reduxjs/toolkit';

import { feedActions } from './feed';
import { profileOrdersActions } from './profile-orders';
import { rootReducer } from './root-reducer';
import { createWebSocketMiddleware } from './websockets/middleware';

import { authApi } from '@/api/auth';
import { WS_BASE_URL } from '@/api/base';
import { authStorage } from '@/utils';

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
  refreshToken: async () => {
    const refreshToken = authStorage.getRefreshToken();

    if (!refreshToken) {
      authStorage.clearTokens();
      return false;
    }

    try {
      const response = await authApi.refreshToken({ token: refreshToken });
      authStorage.saveTokens(response.accessToken, response.refreshToken);
      return true;
    } catch {
      authStorage.clearTokens();
      return false;
    }
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
