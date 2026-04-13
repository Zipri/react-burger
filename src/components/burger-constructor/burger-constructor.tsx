import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';
import { BurgerFooter } from './burger-footer';
import { BurgerIngredient } from './burger-ingredient';

import {
  selectConstructorBun,
  selectConstructorIngredients,
} from '@/services/constructor/selectors';
import { useAppSelector } from '@/services/hooks';

type TBurgerConstructorProps = {
  onOrderClick: () => void;
};

export const BurgerConstructor = ({
  onOrderClick,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = useAppSelector(selectConstructorBun);
  const fillingIngredients = useAppSelector(selectConstructorIngredients);

  return (
    <section className={styles.burger_constructor}>
      {bun ? (
        <ConstructorElement
          type="top"
          isLocked
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass="mb-4 ml-7"
        />
      ) : (
        <p className="text text_type_main-default text_color_inactive mb-4">
          Выберите булку
        </p>
      )}

      <div className={`${styles.ingredients_scroll} custom-scroll`}>
        <ul className={styles.ingredients_list}>
          {fillingIngredients.map((ingredient, index) => (
            <BurgerIngredient
              key={`${ingredient._id}-${index}`}
              ingredient={ingredient}
            />
          ))}
        </ul>
      </div>

      {bun ? (
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass="mt-4 ml-7"
        />
      ) : (
        <p className="text text_type_main-default text_color_inactive mt-4">
          Выберите булку
        </p>
      )}

      <BurgerFooter onOrderClick={onOrderClick} />
    </section>
  );
};
