import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { IngredientInfoModal } from '@modals/ingredientInfo';
import { OrderDetailsModal } from '@modals/orderDetails';
import { useCallback, useEffect, useState } from 'react';
import { v1 } from 'uuid';

import styles from './app.module.css';

import type { TID } from '@/api/base/types';
import { ingredientsApi } from '@/api/ingredients';
import type { TIngredient } from '@/api/ingredients/types';

export const App = (): React.JSX.Element => {
  //#region local state
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  //#endregion

  //#region modal Ingredient state
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState<boolean>(false);

  const openIngredientModal = useCallback((ingredient: TIngredient) => {
    setSelectedIngredient(ingredient);
    setIsIngredientModalOpen(true);
  }, []);

  const handleCloseIngredientModal = useCallback(() => {
    setIsIngredientModalOpen(false);
    setSelectedIngredient(null);
  }, []);
  //#endregion

  //#region modal Order state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [orderNumber] = useState<TID>(v1());
  const openOrderModal = useCallback(() => {
    setIsOrderModalOpen(true);
  }, []);
  const handleCloseOrderModal = useCallback(() => {
    setIsOrderModalOpen(false);
  }, []);
  //#endregion

  //#region handlers
  const handleSelectIngredient = useCallback(
    (ingredient: TIngredient) => {
      setSelectedIngredients((prev) => {
        if (ingredient.type === 'bun') {
          const withoutBuns = prev.filter((item) => item.type !== 'bun');
          return [ingredient, ...withoutBuns];
        }

        return [...prev, ingredient];
      });

      openIngredientModal(ingredient);
    },
    [openIngredientModal]
  );

  const handleRemoveIngredient = useCallback((ingredient: TIngredient) => {
    setSelectedIngredients((prev) => prev.filter((item) => item._id !== ingredient._id));
  }, []);
  //#endregion

  useEffect(() => {
    ingredientsApi
      .getIngredients()
      .then((data) => {
        setIngredients(data);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Ошибка загрузки ингредиентов';
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <IngredientInfoModal
        isOpen={isIngredientModalOpen}
        selectedIngredient={selectedIngredient}
        handleCloseIngredientModal={handleCloseIngredientModal}
      />
      <OrderDetailsModal
        isOpen={isOrderModalOpen}
        orderNumber={orderNumber}
        onClose={handleCloseOrderModal}
      />
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        {isLoading && <Preloader />}
        {!isLoading && error && (
          <p className="text text_type_main-default pl-5">{error}</p>
        )}
        {!isLoading && !error && (
          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              onSelectIngredient={handleSelectIngredient}
            />
            <BurgerConstructor
              ingredients={selectedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
              onOrderClick={openOrderModal}
            />
          </main>
        )}
      </div>
    </>
  );
};

export default App;
