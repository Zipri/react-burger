import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';

type TBurgerFooterProps = {
  totalPrice: number;
  canOrder: boolean;
};

export const BurgerFooter = ({
  totalPrice,
  canOrder,
}: TBurgerFooterProps): React.JSX.Element => {
  return (
    <div className={styles.footer}>
      <div className={styles.price}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" disabled={!canOrder}>
        Оформить заказ
      </Button>
    </div>
  );
};
