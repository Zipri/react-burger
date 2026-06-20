import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';

import { selectIsAuthChecked, selectIsAuthenticated } from '@/services/auth';
import { useAppSelector } from '@/services/hooks';

type TProtectedRouteProps = {
  anonymous?: boolean;
  element: React.JSX.Element;
};

export const ProtectedRoute = ({
  anonymous = false,
  element,
}: TProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (anonymous && isAuthenticated) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};
