import type { TID } from '@/api/base/types';
import type { TIngredient } from '@/api/ingredients/types';
import type { TFeedOrder, TOrderStatus } from '@/api/orders/types';

export type TOrderIngredient = TIngredient & {
  count: number;
};

export const ORDER_STATUS_TEXT: Record<TOrderStatus, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
};

export const getIngredientsById = (
  ingredients: TIngredient[]
): Record<TID, TIngredient> =>
  ingredients.reduce<Record<TID, TIngredient>>((acc, ingredient) => {
    acc[ingredient._id] = ingredient;
    return acc;
  }, {});

export const getOrderPrice = (order: TFeedOrder, ingredients: TIngredient[]): number => {
  const ingredientsById = getIngredientsById(ingredients);

  return order.ingredients.reduce((total, ingredientId) => {
    return total + (ingredientsById[ingredientId]?.price ?? 0);
  }, 0);
};

export const getOrderIngredients = (
  order: TFeedOrder,
  ingredients: TIngredient[]
): TIngredient[] => {
  const ingredientsById = getIngredientsById(ingredients);

  return order.ingredients
    .map((ingredientId) => ingredientsById[ingredientId])
    .filter((ingredient): ingredient is TIngredient => Boolean(ingredient));
};

export const getOrderIngredientsWithCount = (
  order: TFeedOrder,
  ingredients: TIngredient[]
): TOrderIngredient[] => {
  const orderIngredients = getOrderIngredients(order, ingredients);
  const countById = orderIngredients.reduce<Record<TID, number>>((acc, ingredient) => {
    acc[ingredient._id] = (acc[ingredient._id] ?? 0) + 1;
    return acc;
  }, {});

  return Object.values(
    orderIngredients.reduce<Record<TID, TOrderIngredient>>((acc, ingredient) => {
      acc[ingredient._id] = {
        ...ingredient,
        count: countById[ingredient._id],
      };

      return acc;
    }, {})
  );
};

export const getOrderNumberColumns = (
  orders: TFeedOrder[],
  statuses: TOrderStatus[]
): number[][] => {
  const numbers = orders
    .filter((order) => statuses.includes(order.status))
    .slice(0, 20)
    .map((order) => order.number);

  return [numbers.slice(0, 10), numbers.slice(10, 20)].filter(
    (column) => column.length > 0
  );
};
