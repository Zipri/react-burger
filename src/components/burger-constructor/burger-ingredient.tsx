import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';

import type { TIngredient } from '@/api/ingredients/types';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  onRemoveIngredient: (ingredient: TIngredient) => void;
};

export const BurgerIngredient = ({
  ingredient,
  onRemoveIngredient,
}: TBurgerIngredientProps): React.JSX.Element => {
  return (
    <li key={ingredient._id} className={styles.ingredient_item}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onRemoveIngredient(ingredient)}
      />
    </li>
  );
};
