import { useEffect, useMemo } from 'react';

import { OrderCard } from '@/components/order-card';
import {
  profileOrdersActions,
  selectProfileOrdersError,
  selectProfileOrdersItems,
} from '@/services/profile-orders';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

import styles from './profile-orders.module.scss';

export const ProfileOrdersPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectProfileOrdersItems);
  const reversedOrders = useMemo(() => [...orders].reverse(), [orders]);
  const error = useAppSelector(selectProfileOrdersError);

  useEffect(() => {
    dispatch(profileOrdersActions.connect());

    return () => {
      dispatch(profileOrdersActions.disconnect());
    };
  }, [dispatch]);

  if (error) {
    return <p className="text text_type_main-default">{error}</p>;
  }

  return (
    <section className={styles.orders}>
      {reversedOrders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          showStatus
          to={`/profile/orders/${order.number}`}
        />
      ))}
    </section>
  );
};
