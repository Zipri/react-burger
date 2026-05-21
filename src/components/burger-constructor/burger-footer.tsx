import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './burger-constructor.module.scss';

import {
  selectConstructorCanOrder,
  selectConstructorTotalPrice,
} from '@/services/constructor/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { createOrder } from '@/services/order/actions';
import { selectOrderLoading } from '@/services/order/selectors';
import { selectIsAuthenticated } from '@/services/auth/selectors';

export const BurgerFooter = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const totalPrice = useAppSelector(selectConstructorTotalPrice);
  const canOrder = useAppSelector(selectConstructorCanOrder);
  const isOrderLoading = useAppSelector(selectOrderLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleOrderClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }

    dispatch(createOrder());
  }, [dispatch, isAuthenticated, location, navigate]);

  return (
    <div className={styles.footer}>
      <div className={styles.price}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        disabled={!canOrder || isOrderLoading}
        onClick={handleOrderClick}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
