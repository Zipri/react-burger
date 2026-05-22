import { createSlice } from '@reduxjs/toolkit';

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
import type { TAuthState } from './types';
import {
  finishLoading,
  initialRequestState,
  setRequestError,
  startLoading,
} from '@/services/common';

const initialState: TAuthState = {
  ...initialRequestState,
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //#region auth
      .addCase(registerUser.pending, (state) => {
        startLoading(state);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        finishLoading(state);
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        setRequestError(state, action.payload ?? action.error.message);
      })

      .addCase(loginUser.pending, (state) => {
        startLoading(state);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        finishLoading(state);
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        setRequestError(state, action.payload ?? action.error.message);
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      //#endregion auth

      //#region user
      .addCase(getUser.pending, (state) => {
        startLoading(state);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        finishLoading(state);
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        setRequestError(state, action.payload ?? action.error.message);
      })

      .addCase(updateUser.pending, (state) => {
        startLoading(state);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        finishLoading(state);
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        setRequestError(state, action.payload ?? action.error.message);
      })

      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = Boolean(action.payload);
        state.isAuthChecked = true;
      })
      //#endregion user

      //#region password
      .addCase(forgotPassword.pending, (state) => {
        startLoading(state);
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        finishLoading(state);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        setRequestError(state, action.payload ?? action.error.message);
      })

      .addCase(resetPassword.pending, (state) => {
        startLoading(state);
      })
      .addCase(resetPassword.fulfilled, (state) => {
        finishLoading(state);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        setRequestError(state, action.payload ?? action.error.message);
      });
    //#endregion password
  },
});
