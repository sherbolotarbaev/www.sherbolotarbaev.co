'use client';

import clsx from 'clsx';

import Modal, { type ModalProps } from 'components/modal';

import styles from './styles.module.scss';

interface PopupProps extends ModalProps {
  rootClassName?: string;
}

const Popup = ({ rootClassName, className, close, children, ...props }: PopupProps) => (
  <Modal
    className={clsx(styles.modal, rootClassName)}
    close={close}
    onClick={close}
    {...props}
  >
    <div
      className={clsx(styles.container, className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </Modal>
);
export default Popup;
