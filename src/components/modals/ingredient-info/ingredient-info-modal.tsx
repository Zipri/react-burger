import { useCallback } from 'react';

import { IngredientInfoContent } from './ingredient-info';

import { Modal } from '@/components/modal';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
  selectIngredientDetailsIsOpen,
  selectIngredientDetailsLoading,
} from '@/services/ingredient-details/selectors';
import { closeIngredientDetails } from '@/services/ingredient-details/slice';
import { useLocation, useNavigate } from 'react-router-dom';

export const IngredientInfoModal = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isOpen = useAppSelector(selectIngredientDetailsIsOpen);
  const isLoading = useAppSelector(selectIngredientDetailsLoading);

  const handleCloseIngredientModal = useCallback(() => {
    dispatch(closeIngredientDetails());

    if (location.pathname.startsWith('/ingredients/')) {
      navigate(-1);
    }
  }, [dispatch, location.pathname, navigate]);

  return (
    <Modal
      title="Детали ингредиента"
      onClose={handleCloseIngredientModal}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <IngredientInfoContent />
    </Modal>
  );
};
