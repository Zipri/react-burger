export type TUser = {
  email: string;
  name: string;
};

export type TAuthResponseBase = {
  success: true;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TRegisterResponse = TAuthResponseBase & {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = TAuthResponseBase & {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TRefreshTokenRequest = {
  token: string;
};

export type TRefreshTokenResponse = TAuthResponseBase & {
  accessToken: string;
  refreshToken: string;
};

export type TLogoutRequest = {
  token: string;
};

export type TLogoutResponse = TAuthResponseBase & {
  message: string;
};

export type TGetUserResponse = TAuthResponseBase & {
  user: TUser;
};

export type TUpdateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type TUpdateUserResponse = TAuthResponseBase & {
  user: TUser;
};

export type TForgotPasswordRequest = {
  email: string;
};

export type TForgotPasswordResponse = TAuthResponseBase & {
  message: string;
};

export type TResetPasswordRequest = {
  password: string;
  token: string;
};

export type TResetPasswordResponse = TAuthResponseBase & {
  message: string;
};
