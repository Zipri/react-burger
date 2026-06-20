import { useEffect } from 'react';

import styles from './order-info.module.scss';

import { Page } from '@/components/common';
import { OrderInfoContent } from '@/components/order-info';
import { feedActions } from '@/services/feed';
import { useAppDispatch } from '@/services/hooks';

export const OrderInfoPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(feedActions.connect());

    return () => {
      dispatch(feedActions.disconnect());
    };
  }, [dispatch]);

  return (
    <Page>
      <main className={styles.main}>
        <OrderInfoContent view="page" />
      </main>
    </Page>
  );
};
