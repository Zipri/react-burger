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

  protected async get<TResponse>(endpoint = ''): Promise<TResponse> {
    return await this.request<TResponse>(endpoint, {
      method: 'GET',
    });
  }

  protected async post<TResponse, TBody>(
    body: TBody,
    endpoint = ''
  ): Promise<TResponse> {
    return await this.request<TResponse>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  private async request<TResponse>(
    endpoint?: string,
    init?: RequestInit
  ): Promise<TResponse> {
    const endpointUrl = endpoint ? this.buildUrl(endpoint) : this.url;
    const response = await fetch(endpointUrl, init);
    const payload = (await response.json()) as TResponse & TApiErrorResponse;

    if (!response.ok) {
      throw new Error(payload.message || `HTTP error: ${response.status}`);
    }

    if (!payload.success) {
      throw new Error(payload.message || 'API returned unsuccessful response');
    }

    return payload;
  }
}
