import { useMemo } from 'react';

import { BurgerIngredient } from './burger-ingredient';
import { BurgerIngredientsNav } from './burger-ingredients-nav';
import styles from './burger-ingredients.module.scss';

import type { TIngredient, TIngredientType } from '@/api/ingredients/types';
import { useTab } from '@/utils/hooks';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  selectedIngredients: TIngredient[];
  onSelectIngredient: (ingredient: TIngredient) => void;
};

export const BurgerIngredients = ({
  ingredients,
  selectedIngredients,
  onSelectIngredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const { currentTab, sectionRefs, contentRef, scrollToSection, handleScroll } =
    useTab<TIngredientType>({
      tabs: ['bun', 'sauce', 'main'],
      initialTab: 'bun',
    });

  const groupedIngredients = useMemo(
    () => ({
      bun: ingredients.filter((ingredient) => ingredient.type === 'bun'),
      sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
      main: ingredients.filter((ingredient) => ingredient.type === 'main'),
    }),
    [ingredients]
  );

  const ingredientsCountMap = useMemo(() => {
    const map: Record<string, number> = {};

    selectedIngredients.forEach((ingredient) => {
      if (ingredient.type !== 'bun') {
        map[ingredient._id] = (map[ingredient._id] ?? 0) + 1;
      }
    });

    const bun = selectedIngredients.find((ingredient) => ingredient.type === 'bun');
    if (bun) {
      map[bun._id] = 2;
    }

    return map;
  }, [selectedIngredients]);

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
                onSelectIngredient={onSelectIngredient}
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
                onSelectIngredient={onSelectIngredient}
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
                onSelectIngredient={onSelectIngredient}
              />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
