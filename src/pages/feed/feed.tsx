import { useEffect } from 'react';

import { Page } from '@/components/common';
import { OrderCard } from '@/components/order-card';
import { FeedStats } from './feed-stats';
import {
  feedActions,
  selectFeedDoneOrderNumberColumns,
  selectFeedError,
  selectFeedInProgressOrderNumberColumns,
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
} from '@/services/feed';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

import styles from './feed.module.scss';

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectFeedOrders);
  const total = useAppSelector(selectFeedTotal);
  const totalToday = useAppSelector(selectFeedTotalToday);
  const error = useAppSelector(selectFeedError);
  const doneColumns = useAppSelector(selectFeedDoneOrderNumberColumns);
  const inProgressColumns = useAppSelector(selectFeedInProgressOrderNumberColumns);

  useEffect(() => {
    dispatch(feedActions.connect());

    return () => {
      dispatch(feedActions.disconnect());
    };
  }, [dispatch]);

  return (
    <Page title="Лента заказов" error={error}>
      <main className={styles.content}>
        <section className={styles.orders}>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} to={`/feed/${order.number}`} />
          ))}
        </section>

        <FeedStats
          doneColumns={doneColumns}
          inProgressColumns={inProgressColumns}
          total={total}
          totalToday={totalToday}
        />
      </main>
    </Page>
  );
};
