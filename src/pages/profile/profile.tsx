import { NavLink, Outlet } from 'react-router-dom';

import { Page } from '@/components/common';
import styles from './profile.module.scss';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  `${styles.navLink} text text_type_main-medium ${isActive ? styles.navLinkActive : ''}`;

export const ProfilePage = (): React.JSX.Element => (
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
            >
              Выход
            </button>
          </li>
        </ul>

        <p className={`${styles.hint} text text_type_main-default`}>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </nav>

      <section className={styles.outlet}>
        <Outlet />
      </section>
    </main>
  </Page>
);
