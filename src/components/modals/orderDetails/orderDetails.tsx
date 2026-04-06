import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './orderDetails.module.scss';

import { Modal } from '@/components/modal/modal';

type TOrderDetailsModalProps = {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
};

export const OrderDetailsModal = ({
  isOpen,
  orderNumber,
  onClose,
}: TOrderDetailsModalProps): React.JSX.Element => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <Modal title="" onClose={onClose}>
      <div className={styles.content}>
        <p className={`${styles.orderNumber} text text_type_digits-large`}>
          {orderNumber}
        </p>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

        <div className={`${styles.iconWrapper} mt-15 mb-15`}>
          <CheckMarkIcon type="primary" />
        </div>

        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};
