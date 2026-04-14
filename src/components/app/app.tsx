import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientInfoModal } from '@components/modals/ingredient-info';
import { OrderDetailsModal } from '@components/modals/order-details';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { v1 } from 'uuid';

import styles from './app.module.css';

import type { TID } from '@/api/base/types';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { fetchIngredients } from '@/services/ingredients/actions';
import {
  selectIngredientsError,
  selectIngredientsLoading,
} from '@/services/ingredients/selectors';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);

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

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <IngredientInfoModal />
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
            <BurgerIngredients />
            <BurgerConstructor onOrderClick={openOrderModal} />
          </main>
        )}
      </div>
    </>
  );
};

export default App;
