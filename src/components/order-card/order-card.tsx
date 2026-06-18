import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { TFeedOrder } from '@/api/orders/types';
import { selectIngredientsItems } from '@/services/ingredients/selectors';
import { useAppSelector } from '@/services/hooks';
import { getOrderIngredients, getOrderPrice, ORDER_STATUS_TEXT } from '@/utils';

import styles from './order-card.module.scss';
import { EllipsisText } from '../common';

type TOrderCardProps = {
  order: TFeedOrder;
  showStatus?: boolean;
  to: string;
};

const MAX_VISIBLE_INGREDIENTS = 6;

const formatOrderDate = (date: string): string =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));

export const OrderCard = ({
  order,
  showStatus = false,
  to,
}: TOrderCardProps): React.JSX.Element => {
  const location = useLocation();
  const ingredients = useAppSelector(selectIngredientsItems);

  const orderIngredients = useMemo(
    () => getOrderIngredients(order, ingredients),
    [order, ingredients]
  );

  const price = useMemo(() => getOrderPrice(order, ingredients), [order, ingredients]);
  const visibleIngredients = orderIngredients.slice(0, MAX_VISIBLE_INGREDIENTS);
  const hiddenCount = orderIngredients.length - visibleIngredients.length;

  return (
    <Link to={to} state={{ backgroundLocation: location }} className={styles.card}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <time
          className={`${styles.date} text text_type_main-default`}
          dateTime={order.createdAt}
        >
          {formatOrderDate(order.createdAt)}
        </time>
      </div>

      <div className="mt-6">
        <h2 className="text text_type_main-medium">
          <EllipsisText maxLines={2} title={order.name}>
            {order.name}
          </EllipsisText>
        </h2>
        {showStatus && (
          <p
            className={`${styles.status} ${
              order.status === 'done' ? styles.statusDone : ''
            } text text_type_main-default mt-2`}
          >
            {ORDER_STATUS_TEXT[order.status]}
          </p>
        )}
      </div>

      <div className={`${styles.footer} mt-6`}>
        <ul className={styles.ingredients}>
          {visibleIngredients.map((ingredient, index) => {
            const isLastVisible =
              index === MAX_VISIBLE_INGREDIENTS - 1 && hiddenCount > 0;

            return (
              <li
                key={`${ingredient._id}-${index}`}
                className={styles.ingredient}
                style={{ zIndex: visibleIngredients.length - index }}
              >
                <img src={ingredient.image_mobile} alt={ingredient.name} />
                {isLastVisible && (
                  <span className={`${styles.more} text text_type_main-default`}>
                    +{hiddenCount}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
