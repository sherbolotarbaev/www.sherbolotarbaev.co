'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useLogoutMutation } from '@/redux/api/auth';
import clsx from 'clsx';
import { formatDate2 } from 'shared/lib/date';

import Button from 'components/button';
import Image from 'next/image';

import { MdVerified } from 'react-icons/md';
import styles from './styles.module.scss';

interface AccountProps {
  me?: User | undefined;
  close?: boolean;
}

const Account: React.FC<AccountProps> = ({ me, close }) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const handleOpenAccountMenu = () => {
    setIsOpen(!isOpen);
  };

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (_) {}
    window?.location?.reload();
  };

  useEffect(() => {
    if (close) {
      setIsOpen(false);
    }
  }, [close]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  if (!me) {
    return null;
  }

  return (
    <div
      className={clsx(styles.account, isOpen && styles.active)}
      onClick={(e) => e.stopPropagation()}
      ref={accountMenuRef}
    >
      <div
        className={clsx('logo_wrapper', styles.logo_wrapper)}
        onClick={handleOpenAccountMenu}
        style={{
          width: '2.2rem',
          height: '2.2rem',
        }}
      >
        <Image
          className="logo"
          src={me?.photo || 'https://cdn-icons-png.freepik.com/512/552/552721.png'}
          alt={`${me.name} ${me.surname}`}
          loading="lazy"
          layout="fill"
        />
      </div>

      <div className={styles.menu}>
        <div className={styles.info}>
          <div className="logo_wrapper gradient">
            <Image
              className="logo"
              src={me?.photo || 'https://cdn-icons-png.freepik.com/512/552/552721.png'}
              alt={`${me.name} ${me.surname}`}
              loading="lazy"
              layout="fill"
            />
          </div>

          <div className={styles.user}>
            <span className={styles.name}>
              {me.name} {me.surname}
              {me.isVerified && <MdVerified color="var(--color-code-markup-heading)" />}
            </span>

            <span className={styles.joined}>
              Joined {formatDate2(me.createdAt.toString())}
            </span>
          </div>

          <div className={styles.email}>{me.email}</div>
        </div>

        <Button onClick={handleLogout} load={isLoggingOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};
export default Account;
