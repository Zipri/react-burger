import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@/api/auth';
import type { TUpdateUserRequest, TUser } from '@/api/auth/types';
import { authStorage } from '@/utils';

const {
  saveTokens,
  clearTokens,
  getRefreshToken,
  getAccessToken,
  allowPasswordReset,
  denyPasswordReset,
} = authStorage;

//#region auth
export const registerUser = createAsyncThunk<
  TUser,
  { email: string; password: string; name: string },
  { rejectValue: string }
>('auth/registerUser', async (payload, thunkApi) => {
  try {
    const response = await authApi.register(payload);
    saveTokens(response.accessToken, response.refreshToken);
    return response.user;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка регистрации'
    );
  }
});

export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (payload, thunkApi) => {
  try {
    const response = await authApi.login(payload);
    saveTokens(response.accessToken, response.refreshToken);
    return response.user;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка входа'
    );
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, thunkApi) => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await authApi.logout({ token: refreshToken });
      }
      clearTokens();
    } catch (error) {
      clearTokens();
      return thunkApi.rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка выхода'
      );
    }
  }
);
//#endregion auth

//#region user
export const getUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'auth/getUser',
  async (_, thunkApi) => {
    try {
      const response = await authApi.getUser();
      return response.user;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка получения пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  TUpdateUserRequest,
  { rejectValue: string }
>('auth/updateUser', async (payload, thunkApi) => {
  try {
    const response = await authApi.updateUser(payload);
    return response.user;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка обновления профиля'
    );
  }
});

export const checkUserAuth = createAsyncThunk<TUser | null>(
  'auth/checkUserAuth',
  async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken || !refreshToken) {
      return null;
    }

    try {
      const response = await authApi.getUser();
      return response.user;
    } catch {
      clearTokens();
      return null;
    }
  }
);
//#endregion user

//#region password
export const forgotPassword = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: string }
>('auth/forgotPassword', async (payload, thunkApi) => {
  try {
    const response = await authApi.forgotPassword(payload);
    allowPasswordReset();
    return response.message;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка восстановления пароля'
    );
  }
});

export const resetPassword = createAsyncThunk<
  string,
  { password: string; token: string },
  { rejectValue: string }
>('auth/resetPassword', async (payload, thunkApi) => {
  try {
    const response = await authApi.resetPassword(payload);
    denyPasswordReset();
    return response.message;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка сброса пароля'
    );
  }
});
//#endregion password
