import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './login.module.scss';

import { Page } from '@/components/common';
import { loginUser } from '@/services/auth/actions';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useForm } from '@/utils/hooks';

type TLoginForm = {
  email: string;
  password: string;
};

export const LoginPage = (): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  const { values, handleChange, reset } = useForm<TLoginForm>({
    email: '',
    password: '',
  });

  const from = useMemo(
    () =>
      (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/',
    [location.state]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await dispatch(loginUser(values)).unwrap();
        reset();
        navigate(from, { replace: true });
      } catch {
        console.error('Error login user');
      }
    },
    [dispatch, values, reset, from, navigate]
  );

  const isSubmitDisabled = !values.email || !values.password || isLoading;

  return (
    <Page isLoading={isLoading} error={error}>
      <main className={styles.content}>
        <h1 className="text text_type_main-large mb-6">Вход</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
          <Input
            type="email"
            placeholder="E-mail"
            value={values.email}
            onChange={handleChange('email')}
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={values.password}
            onChange={handleChange('password')}
            extraClass="mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={isSubmitDisabled}
            extraClass={styles.button}
          >
            Войти
          </Button>
        </form>

        <div className="mt-20">
          <p className="text text_type_main-default mb-4">
            Вы - новый пользователь?{' '}
            <Link to="/register" className="text text_type_main-default">
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default">
            Забыли пароль?{' '}
            <Link to="/forgot-password" className="text text_type_main-default">
              Восстановить пароль
            </Link>
          </p>
        </div>
      </main>
    </Page>
  );
};
