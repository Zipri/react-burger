import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import styles from './app-header.module.scss';

import { selectIsAuthenticated, selectUser } from '@/services/auth/selectors';
import { useAppSelector } from '@/services/hooks';

type TNavIconComponent = React.ComponentType<{
  type: 'primary' | 'secondary';
}>;

type THeaderNavLinkProps = {
  to: string;
  label: string;
  Icon: TNavIconComponent;
  end?: boolean;
  extraClassName?: string;
};

const HeaderNavLink = ({
  to,
  label,
  Icon,
  end = false,
  extraClassName = '',
}: THeaderNavLinkProps): React.JSX.Element => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `${styles.link} ${extraClassName} ${isActive ? styles.linkActive : ''}`.trim()
    }
  >
    {({ isActive }) => (
      <>
        <Icon type={isActive ? 'primary' : 'secondary'} />
        <p className="text text_type_main-default ml-2">{label}</p>
      </>
    )}
  </NavLink>
);

export const AppHeader = (): React.JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const userName = user?.name || 'Неизвестный пользователь';
  const profileLabel = isAuthenticated ? userName : 'Войти';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menuPartLeft}>
          <HeaderNavLink to="/" end label="Конструктор" Icon={BurgerIcon} />
          <HeaderNavLink
            to="/feed"
            label="Лента заказов"
            Icon={ListIcon}
            extraClassName={styles.leftGap}
          />
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <HeaderNavLink
          to="/profile"
          label={profileLabel}
          Icon={ProfileIcon}
          extraClassName={styles.linkPositionLast}
        />
      </nav>
    </header>
  );
};
