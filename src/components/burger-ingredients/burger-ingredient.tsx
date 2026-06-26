import {
  Counter,
  CurrencyIcon,
  InfoIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './burger-ingredients.module.scss';

import type { TIngredient } from '@/api/ingredients/types';
import { useConstructorIngredientDrag } from '@/components/burger-ingredients/hooks/use-constructor-ingredient-drag';
import { addIngredientToConstructor } from '@/services/constructor/slice';
import { useAppDispatch } from '@/services/hooks';
import { openIngredientDetailsWithPreload } from '@/services/ingredient-details/actions';
import type { TNavigateOptionsState } from '@/services/router';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  count: number;
};

export const BurgerIngredient = ({
  ingredient,
  count,
}: TBurgerIngredientProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectIngredient = useCallback(() => {
    dispatch(addIngredientToConstructor(ingredient));
  }, [dispatch, ingredient]);

  const handleOpenIngredientDetails = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(openIngredientDetailsWithPreload(ingredient));
      navigate(`/ingredients/${ingredient._id}`, {
        state: { backgroundLocation: location } as TNavigateOptionsState,
      });
    },
    [dispatch, ingredient, navigate, location]
  );

  const { isDragging, setNodeRef } = useConstructorIngredientDrag(ingredient);

  return (
    <li
      ref={setNodeRef}
      key={ingredient._id}
      data-testid={`ingredient-card-${ingredient._id}`}
      className={styles.ingredient_item}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <button
        type="button"
        data-testid={`ingredient-info-button-${ingredient._id}`}
        className={styles.detail_button}
        onClick={handleOpenIngredientDetails}
      >
        <InfoIcon type="secondary" />
      </button>
      <button
        type="button"
        data-testid={`ingredient-add-button-${ingredient._id}`}
        className={styles.ingredient_button}
        onClick={handleSelectIngredient}
      >
        {count > 0 && (
          <Counter count={count} size="default" extraClass={styles.counter} />
        )}
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
