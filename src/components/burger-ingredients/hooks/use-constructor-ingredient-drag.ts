import { useCallback } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@/api/ingredients/types';

const DND_CONSTRUCTOR_INGREDIENT = 'constructor-ingredient';

type TConstructorIngredientDragItem = {
  ingredient: TIngredient;
};

export const useConstructorIngredientDrag = (ingredient: TIngredient) => {
  const createItem = useCallback(
    (): TConstructorIngredientDragItem => ({ ingredient }),
    [ingredient]
  );

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DND_CONSTRUCTOR_INGREDIENT,
      item: createItem,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [createItem]
  );

  const setNodeRef = useCallback(
    (node: HTMLElement | null) => {
      dragRef(node);
    },
    [dragRef]
  );

  return { isDragging, setNodeRef };
};
