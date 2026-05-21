import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Page } from '@/components/common';
import { resetPassword } from '@/services/auth/actions';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { authStorage } from '@/utils';
import { useForm } from '@/utils/hooks';

import styles from './reset-password.module.scss';

type TResetPasswordForm = {
  password: string;
  token: string;
};

export const ResetPasswordPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  const { values, handleChange, reset } = useForm<TResetPasswordForm>({
    password: '',
    token: '',
  });

  useEffect(() => {
    if (!authStorage.canResetPassword()) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        await dispatch(resetPassword(values)).unwrap();
        reset();
        navigate('/login', { replace: true });
      } catch {
        console.error('Error reset password');
      }
    },
    [dispatch, values, reset, navigate]
  );

  const isSubmitDisabled = !values.password || !values.token || isLoading;

  return (
    <Page isLoading={isLoading} error={error}>
      <main className={styles.content}>
        <h1 className="text text_type_main-large mb-6">Восстановление пароля</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
          <Input
            type="password"
            placeholder="Введите новый пароль"
            value={values.password}
            onChange={handleChange('password')}
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            value={values.token}
            onChange={handleChange('token')}
            extraClass="mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={isSubmitDisabled}
            extraClass={styles.button}
          >
            Сохранить
          </Button>
        </form>

        <div className="mt-20">
          <p className="text text_type_main-default">
            Вспомнили пароль?{' '}
            <Link to="/login" className="text text_type_main-default">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </Page>
  );
};
