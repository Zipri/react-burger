import { useEffect, useState } from 'react';

import { IngredientInfoContent } from './ingredient-info';

import type { TIngredient } from '@/api/ingredients/types';
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
      <IngredientInfoContent selectedIngredient={selectedIngredient} />
    </Modal>
  );
};
