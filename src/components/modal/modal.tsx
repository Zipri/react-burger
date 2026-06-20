import { ModalOverlay } from '@components/modal-overlay';
import { CloseIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  isOpen?: boolean;
};

export const Modal = ({
  title,
  onClose,
  children,
  isLoading = false,
  isOpen = false,
}: TModalProps): React.JSX.Element | null => {
  const modalRoot = document.getElementById('modals');

  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <section className={styles.modal} role="dialog" aria-modal="true">
        <header className={styles.header}>
          {title ? <h2 className="text text_type_main-large">{title}</h2> : <span />}
          <button
            type="button"
            data-testid="modal-close-button"
            className={styles.closeButton}
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </header>

        {isLoading && <Preloader />}
        {!isLoading && <div className={styles.content}>{children}</div>}
      </section>
    </>,
    modalRoot
  );
};
