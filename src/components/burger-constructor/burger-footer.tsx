import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import styles from './burger-constructor.module.scss';

import {
  selectConstructorCanOrder,
  selectConstructorTotalPrice,
} from '@/services/constructor/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { createOrder } from '@/services/order/actions';
import { selectOrderLoading } from '@/services/order/selectors';

export const BurgerFooter = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const totalPrice = useAppSelector(selectConstructorTotalPrice);
  const canOrder = useAppSelector(selectConstructorCanOrder);
  const isOrderLoading = useAppSelector(selectOrderLoading);

  const handleOrderClick = useCallback(() => {
    dispatch(createOrder());
  }, [dispatch]);

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
