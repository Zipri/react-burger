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

  return (
    <Modal
      title="Детали ингредиента"
      onClose={handleCloseIngredientModal}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <IngredientInfoContent selectedIngredient={selectedIngredient} />
    </Modal>
  );
};
