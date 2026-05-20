import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import styles from './profile-main.module.scss';

export const ProfileMainPage = (): React.JSX.Element => {
  const handleChange = useCallback(() => {}, []);

  return (
    <div className={styles.form}>
      <Input
        type="text"
        placeholder="Имя"
        value="Mark"
        icon="EditIcon"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Логин"
        value="888@stellar.burgers"
        icon="EditIcon"
        onChange={handleChange}
        extraClass="mt-6"
      />
      <Input
        type="password"
        placeholder="Пароль"
        value="******"
        icon="EditIcon"
        onChange={handleChange}
        extraClass="mt-6"
      />
    </div>
  );
};
