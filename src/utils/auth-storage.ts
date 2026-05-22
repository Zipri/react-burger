const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const CAN_RESET_PASSWORD_KEY = 'canResetPassword';

export const authStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  hasTokens(): boolean {
    return Boolean(this.getAccessToken() && this.getRefreshToken());
  },

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  allowPasswordReset(): void {
    localStorage.setItem(CAN_RESET_PASSWORD_KEY, 'true');
  },

  denyPasswordReset(): void {
    localStorage.removeItem(CAN_RESET_PASSWORD_KEY);
  },

  canResetPassword(): boolean {
    return localStorage.getItem(CAN_RESET_PASSWORD_KEY) === 'true';
  },
};
