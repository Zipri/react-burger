import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import styles from './burger-constructor.module.scss';
import { BurgerFooter } from './burger-footer';
import { BurgerIngredient } from './burger-ingredient';

import type { TIngredient } from '@/api/ingredients/types';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
  onRemoveIngredient: (ingredient: TIngredient) => void;
  onOrderClick: () => void;
};

export const BurgerConstructor = ({
  ingredients,
  onRemoveIngredient,
  onOrderClick,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = useMemo(() => {
    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    return buns.at(-1) ?? null;
  }, [ingredients]);

  const fillingIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type !== 'bun'),
    [ingredients]
  );

  const totalPrice = useMemo(() => {
    const fillingPrice = fillingIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    const bunPrice = bun ? bun.price * 2 : 0;
    return fillingPrice + bunPrice;
  }, [fillingIngredients, bun]);

  const canOrder = Boolean(bun) && fillingIngredients.length > 0;

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
              onRemoveIngredient={onRemoveIngredient}
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

      <BurgerFooter
        onOrderClick={onOrderClick}
        totalPrice={totalPrice}
        canOrder={canOrder}
      />
    </section>
  );
};
