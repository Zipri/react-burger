import styles from './ingredient-info.module.scss';

import type { TIngredient } from '@/api/ingredients/types';
import { EllipsisText } from '@/components/common';

type TIngredientInfoContentProps = {
  selectedIngredient: TIngredient | null;
};

export const IngredientInfoContent = ({
  selectedIngredient,
}: TIngredientInfoContentProps): React.JSX.Element => {
  if (!selectedIngredient) {
    return <> Нет данных </>;
  }

  return (
    <div className={styles.content}>
      <img
        src={selectedIngredient.image_large}
        alt={selectedIngredient.name}
        className={styles.image}
      />

      <EllipsisText
        maxLines={2}
        className={`${styles.name} text text_type_main-medium mt-4`}
      >
        {selectedIngredient.name}
      </EllipsisText>

      <ul className={`${styles.nutritionList} mt-8`}>
        <li className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient.calories}
          </p>
        </li>

        <li className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient.proteins}
          </p>
        </li>

        <li className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient.fat}
          </p>
        </li>

        <li className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
