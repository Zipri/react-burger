import { createBrowserRouter, type LoaderFunctionArgs } from 'react-router-dom';

import { App } from '@components/app/app';
import {
  ErrorPage,
  FeedPage,
  ForgotPasswordPage,
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  NotFoundPage,
  ProfileMainPage,
  ProfileOrdersPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '@/pages';
import { store } from '../store';
import { fetchIngredientById, fetchIngredients } from '../ingredients/actions';
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
      { index: true, element: <HomePage /> },
      { path: 'feed', element: <FeedPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      {
        path: 'profile',
        element: <ProfilePage />,
        children: [
          { index: true, element: <ProfileMainPage /> },
          { path: 'orders', element: <ProfileOrdersPage /> },
        ],
      },
      {
        id: 'ingredient-details',
        path: 'ingredients/:id',
        loader: ingredientDetailsLoader,
        element: <IngredientDetailsPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
//#endregion Routes
