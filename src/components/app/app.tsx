import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { useEffect, useState } from 'react';

import styles from './app.module.css';

import { ingredientsApi } from '@/api/ingredients';
import type { TIngredient } from '@/api/ingredients/types';

export const App = (): React.JSX.Element => {
  //#region local state
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  //#endregion

  //#region handlers
  const handleSelectIngredient = (ingredient: TIngredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };
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
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {isLoading && <p className="text text_type_main-default pl-5">Загрузка...</p>}
      {!isLoading && error && (
        <p className="text text_type_main-default pl-5">{error}</p>
      )}
      {!isLoading && !error && (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients
            ingredients={ingredients}
            onSelectIngredient={handleSelectIngredient}
          />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      )}
    </div>
  );
};

export default App;
