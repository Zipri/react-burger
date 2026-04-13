export type TRequestState = {
  isLoading: boolean;
  error: string | null;
};

export const initialRequestState: TRequestState = {
  isLoading: false,
  error: null,
};

export const startLoading = (state: TRequestState): void => {
  state.isLoading = true;
  state.error = null;
};

export const setRequestError = (
  state: TRequestState,
  message: string | null | undefined
): void => {
  state.isLoading = false;
  state.error = message ?? 'Неизвестная ошибка';
};

export const finishLoading = (state: TRequestState): void => {
  state.isLoading = false;
};
