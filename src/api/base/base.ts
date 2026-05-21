import type { TApiErrorResponse } from './types';

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
  private readonly baseUrl = 'https://new-stellarburgers.education-services.ru/api';
  protected readonly url: string;

  constructor(url: string) {
    this.url = `${this.baseUrl}${url}`;
  }

  protected buildUrl(endpoint = ''): string {
    return `${this.url}${endpoint}`;
  }

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
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        headers.set('authorization', accessToken);
      }
      // TODO Выход из приложения
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

    const payload = (await response.json()) as TResponse & TApiErrorResponse;

    if (!response.ok) {
      throw new Error(payload.message || `HTTP error: ${response.status}`);
    }

    if (!payload.success) {
      throw new Error(payload.message || 'API returned unsuccessful response');
    }

    return payload;
  }

  private async refreshTokens(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('Refresh token is missing');
    }

    const response = await fetch(`${this.baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const payload = (await response.json()) as
      | TRefreshSuccessPayload
      | TApiErrorResponse;

    if (!response.ok || !this.isRefreshSuccessPayload(payload)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error(payload.message || 'Token refresh failed');
    }

    localStorage.setItem('accessToken', payload.accessToken);
    localStorage.setItem('refreshToken', payload.refreshToken);
  }

  private isRefreshSuccessPayload = (
    value: TRefreshSuccessPayload | TApiErrorResponse
  ): value is TRefreshSuccessPayload =>
    value.success === true &&
    'accessToken' in value &&
    'refreshToken' in value &&
    typeof value.accessToken === 'string' &&
    typeof value.refreshToken === 'string';
}
