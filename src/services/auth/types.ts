import type { TUser } from '@/api/auth/types';
import type { TRequestState } from '@/services/common';

export type TAuthState = TRequestState & {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
};
