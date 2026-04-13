import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import styles from './burger-constructor.module.scss';

import type { TIngredient } from '@/api/ingredients/types';
import { removeIngredientFromConstructor } from '@/services/constructor/slice';
import { useAppDispatch } from '@/services/hooks';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
};

export const BurgerIngredient = ({
  ingredient,
}: TBurgerIngredientProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const handleRemoveIngredient = useCallback(() => {
    dispatch(removeIngredientFromConstructor(ingredient));
  }, [dispatch, ingredient]);

  return (
    <li key={ingredient._id} className={styles.ingredient_item}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleRemoveIngredient}
      />
    </li>
  );
};
