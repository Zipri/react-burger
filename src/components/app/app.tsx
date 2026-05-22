import { AppHeader } from '@components/app-header/app-header';
import { IngredientInfoModal } from '@components/modals/ingredient-info';
import { OrderDetailsModal } from '@components/modals/order-details';
import { matchPath, Outlet, useLocation, useNavigation } from 'react-router-dom';

import styles from './app.module.css';
import { HomePage } from '@/pages';
import type { TNavigateOptionsState } from '@/services/router';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

export const App = (): React.JSX.Element => {
  const navigation = useNavigation();
  const location = useLocation();

  const isRouteLoading = navigation.state === 'loading';
  const state = location.state as TNavigateOptionsState | null;
  const isIngredientRoute = Boolean(matchPath('/ingredients/:id', location.pathname));
  const isModalView = Boolean(state?.backgroundLocation && isIngredientRoute);

  return (
    <>
      <IngredientInfoModal />
      <OrderDetailsModal />

      {isRouteLoading && <Preloader />}

      <div className={styles.app}>
        <AppHeader />
        {isModalView ? <HomePage /> : <Outlet />}
      </div>
    </>
  );
};

export default App;
