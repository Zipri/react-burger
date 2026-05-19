import { createBrowserRouter } from 'react-router-dom';

import { App } from '@components/app/app';
import { ErrorPage, HomePage } from '@/pages';
import { store } from './store';
import { fetchIngredients } from './ingredients/actions';

const rootLoader = async () => {
  await store.dispatch(fetchIngredients()).unwrap();
  return null;
};

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
    ],
  },
]);
