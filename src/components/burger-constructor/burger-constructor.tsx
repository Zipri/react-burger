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
  const totalPrice = useMemo(() => {
    return ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  }, [ingredients]);

  const canOrder = ingredients.length > 0;

  return (
    <section className={styles.burger_constructor}>
      {ingredients.length > 0 ? (
        <>
          <div className={`${styles.ingredients_scroll} custom-scroll`}>
            <ul className={styles.ingredients_list}>
              {ingredients.map((ingredient) => (
                <BurgerIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                  onRemoveIngredient={onRemoveIngredient}
                />
              ))}
            </ul>
          </div>
          <BurgerFooter
            onOrderClick={onOrderClick}
            totalPrice={totalPrice}
            canOrder={canOrder}
          />
        </>
      ) : (
        <p className="text text_type_main-default">Добавьте ингредиенты</p>
      )}
    </section>
  );
};
