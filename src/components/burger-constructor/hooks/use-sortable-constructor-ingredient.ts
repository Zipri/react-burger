import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DND_SORTABLE_CONSTRUCTOR_INGREDIENT = 'sortable-constructor-ingredient';

type TSortableConstructorItem = {
  index: number;
};

type TUseSortableConstructorIngredientParams = {
  index: number;
  onMove: (fromIndex: number, toIndex: number) => void;
};

export const useSortableConstructorIngredient = ({
  index,
  onMove,
}: TUseSortableConstructorIngredientParams) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DND_SORTABLE_CONSTRUCTOR_INGREDIENT,
      item: { index } satisfies TSortableConstructorItem,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [index]
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: DND_SORTABLE_CONSTRUCTOR_INGREDIENT,
      hover: (item: TSortableConstructorItem) => {
        if (item.index === index) return;
        onMove(item.index, index);
        item.index = index;
      },
    }),
    [index, onMove]
  );

  const setNodeRef = useCallback(
    (node: HTMLLIElement | null) => {
      dragRef(node);
      dropRef(node);
    },
    [dragRef, dropRef]
  );

  return { isDragging, setNodeRef };
};
