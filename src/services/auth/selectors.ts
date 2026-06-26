import type { TAuthState } from './types';

import type { RootState } from '@/services/store';

export const selectAuth = (state: RootState): TAuthState => state.auth;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;
export const selectIsAuthChecked = (state: RootState): boolean =>
  state.auth.isAuthChecked;

export const selectAuthLoading = (state: RootState): boolean => state.auth.isLoading;
export const selectAuthError = (state: RootState): string | null => state.auth.error;
