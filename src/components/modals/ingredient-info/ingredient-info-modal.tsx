import { useCallback } from 'react';

import { IngredientInfoContent } from './ingredient-info';

import { Modal } from '@/components/modal';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
  selectIngredientDetailsIsOpen,
  selectIngredientDetailsLoading,
  selectIngredientDetailsSelectedIngredient,
} from '@/services/ingredient-details/selectors';
import { closeIngredientDetails } from '@/services/ingredient-details/slice';

export const IngredientInfoModal = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIngredientDetailsIsOpen);
  const isLoading = useAppSelector(selectIngredientDetailsLoading);
  const selectedIngredient = useAppSelector(selectIngredientDetailsSelectedIngredient);

  const handleCloseIngredientModal = useCallback(() => {
    dispatch(closeIngredientDetails());
  }, [dispatch]);

  if (!selectedIngredient || !isOpen) {
    return <></>;
  }

  return (
    <Modal
      isLoading={isLoading}
      title="Детали ингредиента"
      onClose={handleCloseIngredientModal}
    >
      <IngredientInfoContent selectedIngredient={selectedIngredient} />
    </Modal>
  );
};
