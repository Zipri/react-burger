import { Tab } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.scss';

import type { TIngredientType } from '@/api/ingredients/types';

type TBurgerIngredientsNavProps = {
  currentTab: TIngredientType;
  scrollToSection: (tab: TIngredientType) => void;
};

export const BurgerIngredientsNav = ({
  currentTab,
  scrollToSection,
}: TBurgerIngredientsNavProps): React.JSX.Element => {
  return (
    <nav>
      <ul className={styles.menu}>
        <li>
          <Tab
            value="bun"
            active={currentTab === 'bun'}
            onClick={() => scrollToSection('bun')}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="sauce"
            active={currentTab === 'sauce'}
            onClick={() => scrollToSection('sauce')}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="main"
            active={currentTab === 'main'}
            onClick={() => scrollToSection('main')}
          >
            Начинки
          </Tab>
        </li>
      </ul>
    </nav>
  );
};
