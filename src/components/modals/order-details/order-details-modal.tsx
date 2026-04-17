import { useCallback } from 'react';

import { OrderDetailsContent } from './order-details';

import { Modal } from '@/components/modal/modal';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { selectOrderIsOpen, selectOrderLoading } from '@/services/order/selectors';
import { closeOrderDetails } from '@/services/order/slice';

export const OrderDetailsModal = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectOrderIsOpen);
  const isLoading = useAppSelector(selectOrderLoading);

  const handleCloseOrderDetails = useCallback(() => {
    dispatch(closeOrderDetails());
  }, [dispatch]);

  return (
    <Modal
      title=""
      onClose={handleCloseOrderDetails}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <OrderDetailsContent />
    </Modal>
  );
};
