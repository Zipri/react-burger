import { AppHeader } from '@components/app-header/app-header';
import { IngredientInfoModal } from '@components/modals/ingredient-info';
import { OrderDetailsModal } from '@components/modals/order-details';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  return (
    <>
      <IngredientInfoModal />
      <OrderDetailsModal />

      <div className={styles.app}>
        <AppHeader />
        <Outlet />
      </div>
    </>
  );
};

export default App;
