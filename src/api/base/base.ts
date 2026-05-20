import type { TApiErrorResponse } from './types';

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
    init: RequestInit = {}
  ): Promise<TResponse> {
    return await this.request<TResponse>(endpoint, {
      ...init,
      method: 'GET',
    });
  }

  protected async post<TResponse, TBody>(
    body: TBody,
    endpoint = '',
    init: RequestInit = {}
  ): Promise<TResponse> {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');
    return await this.request<TResponse>(endpoint, {
      ...init,
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  }

  protected async patch<TResponse, TBody>(
    body: TBody,
    endpoint = '',
    init: RequestInit = {}
  ): Promise<TResponse> {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');
    return await this.request<TResponse>(endpoint, {
      ...init,
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });
  }

  private async request<TResponse>(
    endpoint = '',
    init: RequestInit = {}
  ): Promise<TResponse> {
    const endpointUrl = endpoint ? this.buildUrl(endpoint) : this.url;
    try {
      const response = await fetch(endpointUrl, init);
      const payload = (await response.json()) as TResponse & TApiErrorResponse;

      if (!response.ok) {
        throw new Error(payload.message || `HTTP error: ${response.status}`);
      }

      if (!payload.success) {
        throw new Error(payload.message || 'API returned unsuccessful response');
      }

      return payload;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Network request failed');
    }
  }
}
