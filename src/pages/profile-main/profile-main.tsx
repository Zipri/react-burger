import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useMemo } from 'react';

import { updateUser } from '@/services/auth/actions';
import { selectAuthLoading, selectUser } from '@/services/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useForm } from '@/utils/hooks';

import styles from './profile-main.module.scss';

type TProfileForm = {
  name: string;
  email: string;
  password: string;
};

export const ProfileMainPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);

  const { values, handleChange, setAll } = useForm<TProfileForm>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!user) return;
    setAll({
      name: user.name,
      email: user.email,
      password: '',
    });
  }, [user, setAll]);

  const isChanged = useMemo(() => {
    if (!user) return false;
    return (
      values.name !== user.name ||
      values.email !== user.email ||
      values.password.trim() !== ''
    );
  }, [user, values]);

  const handleCancel = useCallback(() => {
    if (!user) return;
    setAll({
      name: user.name,
      email: user.email,
      password: '',
    });
  }, [user, setAll]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await dispatch(
        updateUser({
          name: values.name,
          email: values.email,
          password: values.password || '',
        })
      );
    },
    [dispatch, values]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        value={values.name}
        icon="EditIcon"
        onChange={handleChange('name')}
      />
      <Input
        type="email"
        placeholder="Логин"
        value={values.email}
        icon="EditIcon"
        onChange={handleChange('email')}
        extraClass="mt-6"
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={values.password}
        icon="EditIcon"
        onChange={handleChange('password')}
        extraClass="mt-6"
      />

      {isChanged && (
        <div className="mt-6" style={{ display: 'flex', gap: '12px' }}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
