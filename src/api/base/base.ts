import { authStorage } from '@/utils';
import type { TApiErrorResponse } from './types';
import { API_BASE_URL } from './constants';

const { getAccessToken, getRefreshToken, clearTokens, saveTokens } = authStorage;

type TRefreshSuccessPayload = {
  success: true;
  accessToken: string;
  refreshToken: string;
  message?: string;
};

type TRequestOptions = {
  /** по умолчанию true */
  auth?: boolean;
};

export abstract class BaseApi {
  private readonly baseUrl = API_BASE_URL;
  protected readonly url: string;

  constructor(url: string) {
    this.url = `${this.baseUrl}${url}`;
  }

  protected buildUrl(endpoint = ''): string {
    return `${this.url}${endpoint}`;
  }

  //#region requests
  protected async get<TResponse>(
    endpoint = '',
    init: RequestInit = {},
    options: TRequestOptions = {}
  ): Promise<TResponse> {
    return await this.request<TResponse>(endpoint, { ...init, method: 'GET' }, options);
  }

  protected async post<TResponse, TBody>(
    body: TBody,
    endpoint = '',
    init: RequestInit = {},
    options: TRequestOptions = {}
  ): Promise<TResponse> {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');

    return await this.request<TResponse>(
      endpoint,
      {
        ...init,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      },
      options
    );
  }

  protected async patch<TResponse, TBody>(
    body: TBody,
    endpoint = '',
    init: RequestInit = {},
    options: TRequestOptions = {}
  ): Promise<TResponse> {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');

    return await this.request<TResponse>(
      endpoint,
      {
        ...init,
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
      },
      options
    );
  }
  //#endregion requests

  //#region base
  private async request<TResponse>(
    endpoint = '',
    init: RequestInit = {},
    options: TRequestOptions = {},
    isSecondTry = false
  ): Promise<TResponse> {
    const endpointUrl = endpoint ? this.buildUrl(endpoint) : this.url;
    const withAuth = options.auth ?? true;

    const headers = new Headers(init.headers);

    if (withAuth) {
      let accessToken = getAccessToken();

      if (!accessToken) {
        await this.refreshTokens();
        accessToken = getAccessToken();
      }

      if (!accessToken) {
        clearTokens();
        throw new Error('Unauthorized');
      }

      headers.set('authorization', accessToken);
    }

    const response = await fetch(endpointUrl, {
      ...init,
      headers,
    });

    // автоматический refresh и повтор запроса
    if (response.status === 401 && withAuth && !isSecondTry) {
      await this.refreshTokens();
      return await this.request<TResponse>(endpoint, init, options, true);
    }

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!isJson) {
      throw new Error(`API returned non-JSON response: ${response.status}`);
    }

    const payload = (await response.json()) as TResponse & TApiErrorResponse;

    if (!response.ok) {
      throw new Error(payload.message || `HTTP error: ${response.status}`);
    }

    if (!payload.success) {
      throw new Error(payload.message || 'API returned unsuccessful response');
    }

    return payload;
  }
  //#endregion base

  //#region refresh
  private async refreshTokens(): Promise<void> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearTokens();
      throw new Error('Refresh token is missing');
    }

    const response = await this.refreshTokensRequest(refreshToken);

    if (!response.success || !this.isRefreshSuccessPayload(response)) {
      clearTokens();
      throw new Error(response.message || 'Token refresh failed');
    }

    saveTokens(response.accessToken, response.refreshToken);
  }

  private async refreshTokensRequest(
    refreshToken: string
  ): Promise<TRefreshSuccessPayload | TApiErrorResponse> {
    const response = await fetch(`${this.baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });
    return (await response.json()) as TRefreshSuccessPayload | TApiErrorResponse;
  }

  private isRefreshSuccessPayload = (
    value: TRefreshSuccessPayload | TApiErrorResponse
  ): value is TRefreshSuccessPayload => {
    return (
      value.success === true &&
      'accessToken' in value &&
      'refreshToken' in value &&
      typeof value.accessToken === 'string' &&
      typeof value.refreshToken === 'string'
    );
  };

  //#endregion refresh
}
