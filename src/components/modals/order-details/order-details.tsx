import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.scss';

import { EllipsisText } from '@/components/common';

type TOrderDetailsContentProps = {
  orderNumber: string | null;
};

export const OrderDetailsContent = ({
  orderNumber,
}: TOrderDetailsContentProps): React.JSX.Element => {
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

      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
