import { useCallback } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '@/components/modal';
import { OrderInfoContent } from '@/components/order-info';
import type { TNavigateOptionsState } from '@/services/router';

export const OrderInfoModal = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as TNavigateOptionsState | null;

  const isOrderRoute =
    Boolean(matchPath('/feed/:id', location.pathname)) ||
    Boolean(matchPath('/profile/orders/:id', location.pathname));

  const isOpen = Boolean(state?.backgroundLocation && isOrderRoute);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal title="" onClose={handleClose} isOpen={isOpen}>
      <OrderInfoContent />
    </Modal>
  );
};
