import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.scss';

import type { TIngredient } from '@/api/ingredients/types';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  onSelectIngredient: (ingredient: TIngredient) => void;
};

export const BurgerIngredient = ({
  ingredient,
  onSelectIngredient,
}: TBurgerIngredientProps): React.JSX.Element => {
  return (
    <li key={ingredient._id} className={styles.ingredient_item}>
      <button
        type="button"
        className={styles.ingredient_button}
        onClick={() => onSelectIngredient(ingredient)}
      >
        <Counter count={0} size="default" extraClass={styles.counter} />
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={styles.ingredient_image}
        />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      </button>
    </li>
  );
};
