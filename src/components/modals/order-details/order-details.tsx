import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.scss';

import { EllipsisText } from '@/components/common';
import { useAppSelector } from '@/services/hooks';
import { selectOrder } from '@/services/order/selectors';

export const OrderDetailsContent = (): React.JSX.Element => {
  const order = useAppSelector(selectOrder);
  const name = order?.name;
  const orderNumber = order?.number;
  const isNameExists = !!name;

  if (!orderNumber) {
    return <> Нет данных </>;
  }

  return (
    <div className={styles.content}>
      <EllipsisText
        maxLines={1}
        className={`${styles.orderNumber} text text_type_digits-large`}
      >
        {orderNumber}
      </EllipsisText>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

      <div className={`${styles.iconWrapper} mt-15 mb-15`}>
        <CheckMarkIcon type="primary" />
      </div>

      <p className="text text_type_main-default">
        Ваш заказ {!isNameExists && 'начали готовить'}
      </p>
      {isNameExists && (
        <EllipsisText
          maxLines={3}
          className={`${styles.orderName} text text_type_main-default`}
        >
          {name}
        </EllipsisText>
      )}
      {isNameExists && <p className="text text_type_main-default">начали готовить</p>}
      <p className="mt-2 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
