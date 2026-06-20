import { combineSlices } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { constructorSlice } from './constructor/slice';
import { feedSlice } from './feed';
import { ingredientDetailsSlice } from './ingredient-details/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';
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
