'use client';

import clsx from 'clsx';
import { getCookie } from 'cookies-next';

import Button from '~/app/components/button';

import styles from './styles.module.scss';

interface GuestbookClientProps {
  me?: User | undefined;
}

export default function GuestbookClient({ me }: Readonly<GuestbookClientProps>) {
  const ip = getCookie('x-forwarded-for');

  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <h2 className="title">sign my guestbook</h2>

          <p className="desc">
            Your IP {ip} | IP from server {me?.metaData.ip}
          </p>

          {me ? (
            <p className="desc">Welcome back {me.name}!</p>
          ) : (
            <Button
              redirect={`${process.env.NEXT_PUBLIC_AUTH_URL}/sign-in?next=/guestbook`}
              width={120}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
