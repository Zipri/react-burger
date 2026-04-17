import { BurgerIngredient } from './burger-ingredient';
import { BurgerIngredientsNav } from './burger-ingredients-nav';
import styles from './burger-ingredients.module.scss';

import type { TIngredientType } from '@/api/ingredients/types';
import { selectIngredientsCountMap } from '@/services/constructor/selectors';
import { useAppSelector } from '@/services/hooks';
import { selectIngredientsGroupedByType } from '@/services/ingredients/selectors';
import { useTab } from '@/utils/hooks';

export const BurgerIngredients = (): React.JSX.Element => {
  const groupedIngredients = useAppSelector(selectIngredientsGroupedByType);
  const ingredientsCountMap = useAppSelector(selectIngredientsCountMap);

  const { currentTab, sectionRefs, contentRef, scrollToSection, handleScroll } =
    useTab<TIngredientType>({
      tabs: ['bun', 'sauce', 'main'],
      initialTab: 'bun',
    });

  return (
    <section className={styles.burger_ingredients}>
      <BurgerIngredientsNav currentTab={currentTab} scrollToSection={scrollToSection} />

      <div
        ref={contentRef}
        onScroll={handleScroll}
        className={`${styles.ingredients_content} custom-scroll`}
      >
        <section ref={sectionRefs.bun} className={styles.ingredients_section}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <ul className={styles.ingredients_list}>
            {groupedIngredients.bun.map((ingredient) => (
              <BurgerIngredient
                key={ingredient._id}
                ingredient={ingredient}
                count={ingredientsCountMap[ingredient._id] ?? 0}
              />
            ))}
          </ul>
        </section>
        <section ref={sectionRefs.sauce} className={styles.ingredients_section}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <ul className={styles.ingredients_list}>
            {groupedIngredients.sauce.map((ingredient) => (
              <BurgerIngredient
                key={ingredient._id}
                ingredient={ingredient}
                count={ingredientsCountMap[ingredient._id] ?? 0}
              />
            ))}
          </ul>
        </section>
        <section ref={sectionRefs.main} className={styles.ingredients_section}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <ul className={styles.ingredients_list}>
            {groupedIngredients.main.map((ingredient) => (
              <BurgerIngredient
                key={ingredient._id}
                ingredient={ingredient}
                count={ingredientsCountMap[ingredient._id] ?? 0}
              />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
