import { useCallback } from 'react';
import { useDrop } from 'react-dnd';

import type { TIngredient } from '@/api/ingredients/types';
import { addIngredientToConstructor } from '@/services/constructor/slice';
import { useAppDispatch } from '@/services/hooks';

const DND_CONSTRUCTOR_INGREDIENT = 'constructor-ingredient';

type TConstructorIngredientDragItem = {
  ingredient: TIngredient;
};

export const useConstructorDrop = () => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    (item: TConstructorIngredientDragItem) => {
      dispatch(addIngredientToConstructor(item.ingredient));
    },
    [dispatch]
  );

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: DND_CONSTRUCTOR_INGREDIENT,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const setNodeRef = useCallback(
    (node: HTMLElement | null) => {
      dropRef(node);
    },
    [dropRef]
  );

  return { isOver, canDrop, setNodeRef };
};
