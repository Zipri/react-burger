import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import styles from './home.module.scss';

import { useAppSelector } from '@/services/hooks';
import {
  selectIngredientsError,
  selectIngredientsLoading,
} from '@/services/ingredients/selectors';
import { Page } from '@/components/common';

export const HomePage = (): React.JSX.Element => {
  const isLoading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);

  return (
    <Page>
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
          <BurgerConstructor />
        </main>
      )}
    </Page>
  );
};
