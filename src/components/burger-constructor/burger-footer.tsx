import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';

import {
  selectConstructorCanOrder,
  selectConstructorTotalPrice,
} from '@/services/constructor/selectors';
import { useAppSelector } from '@/services/hooks';

type TBurgerFooterProps = {
  onOrderClick: () => void;
};

export const BurgerFooter = ({
  onOrderClick,
}: TBurgerFooterProps): React.JSX.Element => {
  const totalPrice = useAppSelector(selectConstructorTotalPrice);
  const canOrder = useAppSelector(selectConstructorCanOrder);

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
        disabled={!canOrder}
        onClick={onOrderClick}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
