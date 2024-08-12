'use client';

import type { HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';
import { useEscape, useLockedBody } from 'shared/lib/modal';

import Portal from 'components/portal';

import styles from './styles.module.scss';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, close, children, className, ...props }, ref) => {
    useLockedBody(isOpen);

    useEscape(close);

    return (
      <CSSTransition
        classNames={{
          enterDone: styles.done,
        }}
        in={isOpen}
        timeout={0}
      >
        <Portal rootId="#modal">
          {isOpen ? (
            <div className={clsx(styles.modal, className)} ref={ref} {...props}>
              {children}
            </div>
          ) : null}
        </Portal>
      </CSSTransition>
    );
  },
);
export default Modal;
