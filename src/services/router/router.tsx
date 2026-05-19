import { createBrowserRouter, type LoaderFunctionArgs } from 'react-router-dom';

import { App } from '@components/app/app';
import { ErrorPage, HomePage, IngredientDetailsPage } from '@/pages';
import { store } from '../store';
import { fetchIngredientById, fetchIngredients } from '../ingredients/actions';
import type { TIngredient } from '@/api/ingredients/types';
import { selectIngredientsItems } from '../ingredients/selectors';
import { setIngredientDetails } from '../ingredient-details/slice';

//#region Loaders
const rootLoader = async () => {
  await store.dispatch(fetchIngredients()).unwrap();
  return null;
};

const ingredientDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Response('Not Found', { status: 404 });
  }

  const ingredient = await store.dispatch(fetchIngredientById(params.id)).unwrap();
  store.dispatch(setIngredientDetails(ingredient));
  return null;
};
//#endregion Loaders

//#region Routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        id: 'ingredient-details',
        path: 'ingredients/:id',
        loader: ingredientDetailsLoader,
        element: <IngredientDetailsPage />,
      },
    ],
  },
]);
//#endregion Routes
