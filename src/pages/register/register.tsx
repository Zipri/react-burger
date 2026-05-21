import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Page } from '@/components/common';
import { registerUser } from '@/services/auth/actions';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useForm } from '@/utils/hooks';

import styles from './register.module.scss';

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  const { values, handleChange, reset } = useForm<TRegisterForm>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        await dispatch(registerUser(values)).unwrap();
        reset();
      } catch {
        console.error('Error register user');
      }
    },
    [dispatch, values, reset]
  );

  const isSubmitDisabled =
    !values.name || !values.email || !values.password || isLoading;

  return (
    <Page isLoading={isLoading} error={error}>
      <main className={styles.content}>
        <h1 className="text text_type_main-large mb-6">Регистрация</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
          <Input
            type="text"
            placeholder="Имя"
            value={values.name}
            onChange={handleChange('name')}
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={values.email}
            onChange={handleChange('email')}
            extraClass="mt-6"
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
            Зарегистрироваться
          </Button>
        </form>

        <div className="mt-20">
          <p className="text text_type_main-default">
            Уже зарегистрированы?{' '}
            <Link to="/login" className="text text_type_main-default">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </Page>
  );
};
