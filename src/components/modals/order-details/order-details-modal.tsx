import { OrderDetailsContent } from './order-details';

import { Modal } from '@/components/modal/modal';

type TOrderDetailsModalProps = {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
};

export const OrderDetailsModal = ({
  isOpen,
  orderNumber,
  onClose,
}: TOrderDetailsModalProps): React.JSX.Element => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <Modal title="" onClose={onClose}>
      <OrderDetailsContent orderNumber={orderNumber} />
    </Modal>
  );
};
