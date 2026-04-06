import { useEffect, useState } from 'react';

import styles from './ingredientInfo.module.scss';

import type { TIngredient } from '@/api/ingredients/types';
import { EllipsisText } from '@/components/common';
import { Modal } from '@/components/modal';

type TIngredientInfoModalProps = {
  isOpen: boolean;
  selectedIngredient: TIngredient | null;
  handleCloseIngredientModal: () => void;
};

export const IngredientInfoModal = ({
  isOpen,
  selectedIngredient,
  handleCloseIngredientModal,
}: TIngredientInfoModalProps): React.JSX.Element => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen || !selectedIngredient) {
      setIsImageLoaded(false);
      return;
    }
    let isActive = true;
    const image = new Image();
    image.src = selectedIngredient.image_large;
    image.onload = () => {
      if (isActive) {
        setIsImageLoaded(true);
      }
    };
    image.onerror = () => {
      if (isActive) {
        setIsImageLoaded(true);
      }
    };
    return () => {
      isActive = false;
    };
  }, [isOpen, selectedIngredient]);

  if (!selectedIngredient || !isOpen) {
    return <></>;
  }

  return (
    <Modal
      isLoading={!isImageLoaded}
      title="Детали ингредиента"
      onClose={handleCloseIngredientModal}
    >
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
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive mt-2">
              {selectedIngredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </Modal>
  );
};
