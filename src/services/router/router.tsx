import { App } from '@components/app/app';
import { createHashRouter, type LoaderFunctionArgs } from 'react-router-dom';

import { checkUserAuth } from '../auth/actions';
import { setIngredientDetails } from '../ingredient-details/slice';
import { fetchIngredientById, fetchIngredients } from '../ingredients/actions';
import { store } from '../store';

import { ProtectedRoute } from '@/components/protected-route';
import {
  ErrorPage,
  FeedPage,
  ForgotPasswordPage,
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  NotFoundPage,
  OrderInfoPage,
  ProfileMainPage,
  ProfileOrdersPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '@/pages';

//#region Loaders
const rootLoader = async () => {
  await Promise.all([
    store.dispatch(checkUserAuth()).unwrap(),
    store.dispatch(fetchIngredients()).unwrap(),
  ]);
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
export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'feed', element: <FeedPage /> },
      {
        path: 'login',
        element: <ProtectedRoute anonymous element={<LoginPage />} />,
      },
      {
        path: 'register',
        element: <ProtectedRoute anonymous element={<RegisterPage />} />,
      },
      {
        path: 'forgot-password',
        element: <ProtectedRoute anonymous element={<ForgotPasswordPage />} />,
      },
      {
        path: 'reset-password',
        element: <ProtectedRoute anonymous element={<ResetPasswordPage />} />,
      },
      { path: 'feed/:id', element: <OrderInfoPage /> },
      {
        path: 'profile/orders/:id',
        element: <ProtectedRoute element={<OrderInfoPage />} />,
      },
      {
        path: 'profile',
        element: <ProtectedRoute element={<ProfilePage />} />,
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
