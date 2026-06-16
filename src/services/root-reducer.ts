import { combineSlices } from '@reduxjs/toolkit';

import { constructorSlice } from './constructor/slice';
import { ingredientDetailsSlice } from './ingredient-details/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';
import { authSlice } from './auth';
import { feedSlice } from './feed';
import { profileOrdersSlice } from './profile-orders/slice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  ingredientDetailsSlice,
  orderSlice,
  authSlice,
  feedSlice,
  profileOrdersSlice
);
