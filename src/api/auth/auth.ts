import { BaseApi } from '@/api/base';

import type {
  TForgotPasswordRequest,
  TForgotPasswordResponse,
  TGetUserResponse,
  TLoginRequest,
  TLoginResponse,
  TLogoutRequest,
  TLogoutResponse,
  TRefreshTokenRequest,
  TRefreshTokenResponse,
  TRegisterRequest,
  TRegisterResponse,
  TResetPasswordRequest,
  TResetPasswordResponse,
  TUpdateUserRequest,
  TUpdateUserResponse,
} from './types';

class AuthApi extends BaseApi {
  constructor() {
    super('');
  }

  public async register(data: TRegisterRequest): Promise<TRegisterResponse> {
    return await this.post<TRegisterResponse, TRegisterRequest>(data, '/auth/register');
  }

  public async login(data: TLoginRequest): Promise<TLoginResponse> {
    return await this.post<TLoginResponse, TLoginRequest>(data, '/auth/login');
  }

  public async refreshToken(data: TRefreshTokenRequest): Promise<TRefreshTokenResponse> {
    return await this.post<TRefreshTokenResponse, TRefreshTokenRequest>(
      data,
      '/auth/token'
    );
  }

  public async logout(data: TLogoutRequest): Promise<TLogoutResponse> {
    return await this.post<TLogoutResponse, TLogoutRequest>(data, '/auth/logout');
  }

  public async getUser(accessToken: string): Promise<TGetUserResponse> {
    return await this.get<TGetUserResponse>('/auth/user', {
      headers: {
        authorization: accessToken,
      },
    });
  }

  public async updateUser(
    accessToken: string,
    data: TUpdateUserRequest
  ): Promise<TUpdateUserResponse> {
    return await this.patch<TUpdateUserResponse, TUpdateUserRequest>(
      data,
      '/auth/user',
      {
        headers: {
          authorization: accessToken,
        },
      }
    );
  }

  public async forgotPassword(
    data: TForgotPasswordRequest
  ): Promise<TForgotPasswordResponse> {
    return await this.post<TForgotPasswordResponse, TForgotPasswordRequest>(
      data,
      '/password-reset'
    );
  }

  public async resetPassword(
    data: TResetPasswordRequest
  ): Promise<TResetPasswordResponse> {
    return await this.post<TResetPasswordResponse, TResetPasswordRequest>(
      data,
      '/password-reset/reset'
    );
  }
}

export const authApi = new AuthApi();
