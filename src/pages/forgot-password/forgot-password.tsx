import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Page } from '@/components/common';
import { forgotPassword } from '@/services/auth/actions';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useForm } from '@/utils/hooks';

import styles from './forgot-password.module.scss';

type TForgotPasswordForm = {
  email: string;
};

export const ForgotPasswordPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  const { values, handleChange, reset } = useForm<TForgotPasswordForm>({
    email: '',
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        await dispatch(forgotPassword({ email: values.email })).unwrap();
        reset();
        navigate('/reset-password', { replace: true });
      } catch {
        console.error('Error login user');
      }
    },
    [dispatch, values.email, reset, navigate]
  );

  const isSubmitDisabled = !values.email || isLoading;

  return (
    <Page isLoading={isLoading} error={error}>
      <main className={styles.content}>
        <h1 className="text text_type_main-large mb-6">Восстановление пароля</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
          <Input
            type="email"
            placeholder="Укажите e-mail"
            value={values.email}
            onChange={handleChange('email')}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={isSubmitDisabled}
            extraClass={styles.button}
          >
            Восстановить
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
