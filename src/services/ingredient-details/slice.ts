import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/api/ingredients/types';
import {
  closeModal,
  initialModalState,
  openModal,
  type TModalState,
} from '@/services/common/modal-state';
import {
  finishLoading,
  resetRequestState,
  setRequestError,
  startLoading,
} from '@/services/common/request-state';

export type TIngredientDetailsState = TModalState & {
  ingredient: TIngredient | null;
};

const initialState: TIngredientDetailsState = {
  ...initialModalState,
  ingredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    openIngredientDetails: (state, action: PayloadAction<TIngredient>) => {
      state.ingredient = action.payload;
      openModal(state);
    },
    startIngredientImageLoading: (state) => {
      startLoading(state);
    },
    setIngredientDetails: (state, action: PayloadAction<TIngredient>) => {
      state.ingredient = action.payload;
      resetRequestState(state);
    },
    finishIngredientImageLoading: (state) => {
      finishLoading(state);
    },
    failIngredientImageLoading: (state, action: PayloadAction<string | undefined>) => {
      setRequestError(state, action.payload);
    },
    closeIngredientDetails: (state) => {
      state.ingredient = null;
      resetRequestState(state);
      closeModal(state);
    },
  },
});

export const {
  openIngredientDetails,
  startIngredientImageLoading,
  finishIngredientImageLoading,
  failIngredientImageLoading,
  closeIngredientDetails,
  setIngredientDetails,
} = ingredientDetailsSlice.actions;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
