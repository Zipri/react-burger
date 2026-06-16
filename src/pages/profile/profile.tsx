import { useCallback, useMemo, type ReactNode } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Page } from '@/components/common';
import { logoutUser } from '@/services/auth/actions';
import { useAppDispatch } from '@/services/hooks';

import styles from './profile.module.scss';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  `${styles.navLink} text text_type_main-medium ${isActive ? styles.navLinkActive : ''}`;

type TProfilePageProps = {
  children?: ReactNode;
};

export const ProfilePage = ({ children }: TProfilePageProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab: 'profile' | 'orders' | null = useMemo(() => {
    const path = location.pathname;
    if (path === '/profile') return 'profile';
    if (path === '/profile/orders') return 'orders';
    return null as 'profile' | 'orders' | null;
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } finally {
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate]);

  return (
    <Page className={styles.page}>
      <main className={styles.content}>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li>
              <NavLink to="/profile" end className={getNavLinkClassName}>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile/orders" className={getNavLinkClassName}>
                История заказов
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.logout} text text_type_main-medium`}
                onClick={handleLogout}
              >
                Выход
              </button>
            </li>
          </ul>

          {currentTab === 'profile' && (
            <p className={`${styles.hint} text text_type_main-default`}>
              В этом разделе вы можете
              <br />
              изменить свои персональные данные
            </p>
          )}
        </nav>

        <section className={styles.outlet}>{children ?? <Outlet />}</section>
      </main>
    </Page>
  );
};
