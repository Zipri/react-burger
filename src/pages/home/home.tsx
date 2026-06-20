import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './home.module.scss';

import { Page } from '@/components/common';
import { useAppSelector } from '@/services/hooks';
import { selectIngredientsError } from '@/services/ingredients/selectors';

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
