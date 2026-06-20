import {
  addIngredientToConstructor,
  constructorReducer,
  moveIngredientInConstructor,
  removeIngredientFromConstructor,
} from './slice';

import type { TIngredient } from '@/api/ingredients/types';

const bunIngredient: TIngredient = {
  _id: 'bun-id',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'bun-image',
  image_large: 'bun-image-large',
  image_mobile: 'bun-image-mobile',
  __v: 0,
};

const mainIngredient: TIngredient = {
  _id: 'main-id',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'main-image',
  image_large: 'main-image-large',
  image_mobile: 'main-image-mobile',
  __v: 0,
};

const sauceIngredient: TIngredient = {
  _id: 'sauce-id',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'sauce-image',
  image_large: 'sauce-image-large',
  image_mobile: 'sauce-image-mobile',
  __v: 0,
};

describe('constructorSlice reducer', () => {
  it('возвращает initial state', () => {
    const state = constructorReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('добавляет булку в constructor', () => {
    const action = addIngredientToConstructor(bunIngredient);
    const state = constructorReducer(undefined, action);

    expect(state.bun).toEqual({
      ...bunIngredient,
      id: expect.any(String),
    });
    expect(state.ingredients).toEqual([]);
  });

  it('заменяет булку при повторном добавлении булки', () => {
    const firstState = constructorReducer(
      undefined,
      addIngredientToConstructor(bunIngredient)
    );

    const anotherBun: TIngredient = {
      ...bunIngredient,
      _id: 'another-bun-id',
      name: 'Краторная булка',
    };

    const state = constructorReducer(firstState, addIngredientToConstructor(anotherBun));

    expect(state.bun?._id).toBe('another-bun-id');
    expect(state.bun?.name).toBe('Краторная булка');
  });

  it('добавляет небулочные ингредиенты в список', () => {
    const stateWithMain = constructorReducer(
      undefined,
      addIngredientToConstructor(mainIngredient)
    );
    const finalState = constructorReducer(
      stateWithMain,
      addIngredientToConstructor(sauceIngredient)
    );

    expect(finalState.bun).toBeNull();
    expect(finalState.ingredients).toHaveLength(2);
    expect(finalState.ingredients[0]).toEqual({
      ...mainIngredient,
      id: expect.any(String),
    });
    expect(finalState.ingredients[1]).toEqual({
      ...sauceIngredient,
      id: expect.any(String),
    });
  });

  it('удаляет ингредиент из constructor по id', () => {
    const withMain = constructorReducer(
      undefined,
      addIngredientToConstructor(mainIngredient)
    );
    const withTwoIngredients = constructorReducer(
      withMain,
      addIngredientToConstructor(sauceIngredient)
    );

    const ingredientToRemove = withTwoIngredients.ingredients[0];

    const state = constructorReducer(
      withTwoIngredients,
      removeIngredientFromConstructor(ingredientToRemove)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('sauce-id');
  });

  it('перемещает ингредиент внутри constructor при валидных индексах', () => {
    const withMain = constructorReducer(
      undefined,
      addIngredientToConstructor(mainIngredient)
    );
    const withTwoIngredients = constructorReducer(
      withMain,
      addIngredientToConstructor(sauceIngredient)
    );

    const state = constructorReducer(
      withTwoIngredients,
      moveIngredientInConstructor({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients[0]._id).toBe('sauce-id');
    expect(state.ingredients[1]._id).toBe('main-id');
  });

  it('не меняет порядок при невалидных индексах перемещения', () => {
    const withMain = constructorReducer(
      undefined,
      addIngredientToConstructor(mainIngredient)
    );
    const baseState = constructorReducer(
      withMain,
      addIngredientToConstructor(sauceIngredient)
    );

    const sameIndexState = constructorReducer(
      baseState,
      moveIngredientInConstructor({ fromIndex: 0, toIndex: 0 })
    );
    const negativeState = constructorReducer(
      baseState,
      moveIngredientInConstructor({ fromIndex: -1, toIndex: 0 })
    );
    const outOfRangeState = constructorReducer(
      baseState,
      moveIngredientInConstructor({ fromIndex: 0, toIndex: 5 })
    );

    expect(sameIndexState.ingredients.map((item) => item._id)).toEqual([
      'main-id',
      'sauce-id',
    ]);
    expect(negativeState.ingredients.map((item) => item._id)).toEqual([
      'main-id',
      'sauce-id',
    ]);
    expect(outOfRangeState.ingredients.map((item) => item._id)).toEqual([
      'main-id',
      'sauce-id',
    ]);
  });
});
