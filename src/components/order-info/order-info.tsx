import { CurrencyIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ordersApi } from '@/api/orders';
import type { TFeedOrder } from '@/api/orders/types';
import { EllipsisText } from '@/components/common';
import { selectFeedOrderByNumber } from '@/services/feed';
import { selectProfileOrderByNumber } from '@/services/profile-orders';
import { selectIngredientsItems } from '@/services/ingredients/selectors';
import { useAppSelector } from '@/services/hooks';
import { getOrderIngredientsWithCount, getOrderPrice, ORDER_STATUS_TEXT } from '@/utils';

import styles from './order-info.module.scss';

type TOrderInfoContentProps = {
  view?: 'modal' | 'page';
};

const formatOrderDate = (date: string): string =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));

export const OrderInfoContent = ({
  view = 'modal',
}: TOrderInfoContentProps): React.JSX.Element => {
  const { id } = useParams();
  const orderNumber = Number(id);
  const hasValidOrderNumber = Number.isFinite(orderNumber);

  const ingredients = useAppSelector(selectIngredientsItems);
  const orderFromStore = useAppSelector((state) => {
    if (!hasValidOrderNumber) return undefined;

    return (
      selectFeedOrderByNumber(state, orderNumber) ??
      selectProfileOrderByNumber(state, orderNumber)
    );
  });

  const [loadedOrder, setLoadedOrder] = useState<TFeedOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const order = orderFromStore ?? loadedOrder;

  useEffect(() => {
    setLoadedOrder(null);
    setError(null);

    if (!hasValidOrderNumber || orderFromStore) {
      setIsLoading(false);
      return;
    }

    let isActualRequest = true;

    setIsLoading(true);

    ordersApi
      .getOrderByNumber(orderNumber)
      .then((orderData) => {
        if (isActualRequest) {
          setLoadedOrder(orderData);
        }
      })
      .catch((requestError) => {
        if (isActualRequest) {
          setError(
            requestError instanceof Error ? requestError.message : 'Заказ не найден'
          );
        }
      })
      .finally(() => {
        if (isActualRequest) {
          setIsLoading(false);
        }
      });

    return () => {
      isActualRequest = false;
    };
  }, [orderNumber, orderFromStore]);

  const orderIngredients = useMemo(
    () => (order ? getOrderIngredientsWithCount(order, ingredients) : []),
    [order, ingredients]
  );

  const price = useMemo(
    () => (order ? getOrderPrice(order, ingredients) : 0),
    [order, ingredients]
  );

  if (isLoading || (!order && !error && hasValidOrderNumber)) {
    return <Preloader />;
  }

  if (error || !order) {
    return <p className="text text_type_main-default">{error ?? 'Заказ не найден'}</p>;
  }

  return (
    <article
      className={`${styles.content} ${view === 'page' ? styles.contentPage : ''}`}
    >
      <p className={`${styles.number} text text_type_digits-default`}>#{order.number}</p>

      <EllipsisText
        maxLines={2}
        title={order.name}
        className={`${styles.name} text text_type_main-medium mt-10`}
      >
        {order.name}
      </EllipsisText>

      <p
        className={`${styles.status} ${
          order.status === 'done' ? styles.statusDone : ''
        } text text_type_main-default mt-3`}
      >
        {ORDER_STATUS_TEXT[order.status]}
      </p>

      <h2 className="text text_type_main-medium mt-15 mb-6">Состав:</h2>

      <ul className={styles.ingredients}>
        {orderIngredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.ingredient}>
            <div className={styles.imageWrapper}>
              <img src={ingredient.image_mobile} alt={ingredient.name} />
            </div>

            <EllipsisText
              maxLines={2}
              title={ingredient.name}
              className={`${styles.ingredientName} text text_type_main-default`}
            >
              {ingredient.name}
            </EllipsisText>

            <div className={styles.ingredientPrice}>
              <span className="text text_type_digits-default">
                {ingredient.count} x {ingredient.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>

      <footer className={`${styles.footer} mt-10`}>
        <time
          className="text text_type_main-default text_color_inactive"
          dateTime={order.createdAt}
        >
          {formatOrderDate(order.createdAt)}
        </time>

        <div className={styles.total}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </footer>
    </article>
  );
};
