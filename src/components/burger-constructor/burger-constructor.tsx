import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';
import { BurgerFooter } from './burger-footer';
import { BurgerIngredient } from './burger-ingredient';

import { useConstructorDrop } from '@/components/burger-constructor/hooks/use-constructor-drop';
import {
  selectConstructorBun,
  selectConstructorIngredients,
} from '@/services/constructor/selectors';
import { useAppSelector } from '@/services/hooks';

export const BurgerConstructor = (): React.JSX.Element => {
  const bun = useAppSelector(selectConstructorBun);
  const fillingIngredients = useAppSelector(selectConstructorIngredients);

  const { isOver, canDrop, setNodeRef } = useConstructorDrop();

  return (
    <section className={styles.burger_constructor}>
      <div
        ref={setNodeRef}
        className={`${styles.drop_area} ${isOver && canDrop ? styles.drop_active : ''}`}
      >
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="mb-4 ml-7"
          />
        ) : (
          <div className={`${styles.placeholder} ${styles.placeholder_top} mb-4 ml-7`}>
            <p className="text text_type_main-default text_color_inactive">
              Выберите булки
            </p>
          </div>
        )}

        <div className={`${styles.ingredients_scroll} custom-scroll`}>
          {fillingIngredients.length > 0 ? (
            <ul className={styles.ingredients_list}>
              {fillingIngredients.map((ingredient, index) => (
                <BurgerIngredient
                  key={ingredient.id}
                  ingredient={ingredient}
                  index={index}
                />
              ))}
            </ul>
          ) : (
            <div className={`${styles.placeholder} ${styles.placeholder_middle}`}>
              <p className="text text_type_main-default text_color_inactive">
                Выберите начинку
              </p>
            </div>
          )}
        </div>

        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="mt-4 ml-7"
          />
        ) : (
          <div
            className={`${styles.placeholder} ${styles.placeholder_bottom} mt-4 ml-7`}
          >
            <p className="text text_type_main-default text_color_inactive">
              Выберите булки
            </p>
          </div>
        )}
      </div>

      <BurgerFooter />
    </section>
  );
};
