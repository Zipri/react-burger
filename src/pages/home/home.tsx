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
  const error = useAppSelector(selectIngredientsError);

  return (
    <Page title="Соберите бургер" error={error}>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </Page>
  );
};
