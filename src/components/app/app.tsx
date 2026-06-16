import { AppHeader } from '@components/app-header/app-header';
import { IngredientInfoModal } from '@components/modals/ingredient-info';
import { OrderDetailsModal } from '@components/modals/order-details';
import { OrderInfoModal } from '@components/modals/order-info';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { matchPath, Outlet, useLocation, useNavigation } from 'react-router-dom';

import { FeedPage, HomePage, ProfileOrdersPage, ProfilePage } from '@/pages';
import type { TNavigateOptionsState } from '@/services/router';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const navigation = useNavigation();
  const location = useLocation();

  const isRouteLoading = navigation.state === 'loading';
  const state = location.state as TNavigateOptionsState | null;

  const isIngredientRoute = Boolean(matchPath('/ingredients/:id', location.pathname));
  const isFeedOrderRoute = Boolean(matchPath('/feed/:id', location.pathname));
  const isProfileOrderRoute = Boolean(
    matchPath('/profile/orders/:id', location.pathname)
  );
  const isOrderRoute = isFeedOrderRoute || isProfileOrderRoute;

  const isModalView = Boolean(
    state?.backgroundLocation && (isIngredientRoute || isOrderRoute)
  );

  const getBackgroundPage = (): React.JSX.Element => {
    if (isIngredientRoute) {
      return <HomePage />;
    }

    if (isFeedOrderRoute) {
      return <FeedPage />;
    }

    if (isProfileOrderRoute) {
      return (
        <ProfilePage>
          <ProfileOrdersPage />
        </ProfilePage>
      );
    }

    return <Outlet />;
  };

  return (
    <>
      <IngredientInfoModal />
      <OrderDetailsModal />
      <OrderInfoModal />

      {isRouteLoading && <Preloader />}

      <div className={styles.app}>
        <AppHeader />
        {isModalView ? getBackgroundPage() : <Outlet />}
      </div>
    </>
  );
};

export default App;
