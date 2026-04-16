import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import styles from './burger-constructor.module.scss';

import { useSortableConstructorIngredient } from '@/components/burger-constructor/hooks/use-sortable-constructor-ingredient';
import {
  moveIngredientInConstructor,
  removeIngredientFromConstructor,
} from '@/services/constructor/slice';
import type { TConstructorIngredient } from '@/services/constructor/types';
import { useAppDispatch } from '@/services/hooks';

type TBurgerIngredientProps = {
  ingredient: TConstructorIngredient;
  index: number;
};

export const BurgerIngredient = ({
  ingredient,
  index,
}: TBurgerIngredientProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const handleRemoveIngredient = useCallback(() => {
    dispatch(removeIngredientFromConstructor(ingredient));
  }, [dispatch, ingredient]);

  const handleMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      dispatch(moveIngredientInConstructor({ fromIndex, toIndex }));
    },
    [dispatch]
  );

  const { isDragging, setNodeRef } = useSortableConstructorIngredient({
    index,
    onMove: handleMove,
  });

  return (
    <li
      key={ingredient.id}
      ref={setNodeRef}
      className={styles.ingredient_item}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
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
