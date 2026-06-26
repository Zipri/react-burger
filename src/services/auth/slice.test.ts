import {
  checkUserAuth,
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from './actions';
import { authSlice } from './slice';

import type { TUser } from '@/api/auth/types';

const initialAction = { type: '@@INIT' };

const user: TUser = {
  email: 'test@example.com',
  name: 'Test User',
};

const anotherUser: TUser = {
  email: 'another@example.com',
  name: 'Another User',
};

describe('authSlice reducer', () => {
  it('возвращает initial state', () => {
    const state = authSlice.reducer(undefined, initialAction);

    expect(state).toEqual({
      user: null,
      isAuthenticated: false,
      isAuthChecked: false,
      isLoading: false,
      error: null,
    });
  });

  describe('pending handlers', () => {
    it.each([
      registerUser.pending.type,
      loginUser.pending.type,
      getUser.pending.type,
      updateUser.pending.type,
      forgotPassword.pending.type,
      resetPassword.pending.type,
    ])('%s ставит isLoading=true и очищает error', (pendingType) => {
      const stateWithError = authSlice.reducer(undefined, {
        type: registerUser.rejected.type,
        payload: 'Ошибка',
        error: { message: 'Ошибка' },
      });

      const state = authSlice.reducer(stateWithError, { type: pendingType });

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('fulfilled handlers', () => {
    it('registerUser.fulfilled сохраняет user и авторизует', () => {
      const state = authSlice.reducer(undefined, {
        type: registerUser.fulfilled.type,
        payload: user,
      });

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('loginUser.fulfilled сохраняет user и авторизует', () => {
      const state = authSlice.reducer(undefined, {
        type: loginUser.fulfilled.type,
        payload: user,
      });

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('logoutUser.fulfilled очищает user и снимает авторизацию', () => {
      const authenticatedState = authSlice.reducer(undefined, {
        type: loginUser.fulfilled.type,
        payload: user,
      });

      const state = authSlice.reducer(authenticatedState, {
        type: logoutUser.fulfilled.type,
      });

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it('getUser.fulfilled сохраняет user и авторизует', () => {
      const state = authSlice.reducer(undefined, {
        type: getUser.fulfilled.type,
        payload: user,
      });

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('updateUser.fulfilled обновляет user и завершает loading', () => {
      const baseState = authSlice.reducer(undefined, {
        type: loginUser.fulfilled.type,
        payload: user,
      });

      const state = authSlice.reducer(baseState, {
        type: updateUser.fulfilled.type,
        payload: anotherUser,
      });

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(anotherUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('checkUserAuth.fulfilled с user выставляет authChecked и авторизацию', () => {
      const state = authSlice.reducer(undefined, {
        type: checkUserAuth.fulfilled.type,
        payload: user,
      });

      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('checkUserAuth.fulfilled с null выставляет authChecked и снимает авторизацию', () => {
      const state = authSlice.reducer(undefined, {
        type: checkUserAuth.fulfilled.type,
        payload: null,
      });

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    it('forgotPassword.fulfilled завершает loading', () => {
      const loadingState = authSlice.reducer(undefined, {
        type: forgotPassword.pending.type,
      });

      const state = authSlice.reducer(loadingState, {
        type: forgotPassword.fulfilled.type,
        payload: 'ok',
      });

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('resetPassword.fulfilled завершает loading', () => {
      const loadingState = authSlice.reducer(undefined, {
        type: resetPassword.pending.type,
      });

      const state = authSlice.reducer(loadingState, {
        type: resetPassword.fulfilled.type,
        payload: 'ok',
      });

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('rejected handlers', () => {
    it.each([
      registerUser.rejected.type,
      loginUser.rejected.type,
      getUser.rejected.type,
      updateUser.rejected.type,
      forgotPassword.rejected.type,
      resetPassword.rejected.type,
    ])('%s берёт ошибку из payload', (rejectedType) => {
      const state = authSlice.reducer(undefined, {
        type: rejectedType,
        payload: 'Текст ошибки из payload',
        error: { message: 'Текст из error.message' },
      });

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Текст ошибки из payload');
    });

    it.each([
      registerUser.rejected.type,
      loginUser.rejected.type,
      getUser.rejected.type,
      updateUser.rejected.type,
      forgotPassword.rejected.type,
      resetPassword.rejected.type,
    ])('%s берёт ошибку из error.message при пустом payload', (rejectedType) => {
      const state = authSlice.reducer(undefined, {
        type: rejectedType,
        payload: undefined,
        error: { message: 'Текст из error.message' },
      });

      expect(state.error).toBe('Текст из error.message');
    });
  });
});
