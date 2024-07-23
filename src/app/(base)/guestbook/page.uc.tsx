'use client';

import clsx from 'clsx';

import Button from '~/app/components/button';

import styles from './styles.module.scss';

interface GuestbookClientProps {
  me: User | undefined;
}

export default function GuestbookClient({ me }: Readonly<GuestbookClientProps>) {
  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <h2 className="title">sign my guestbook</h2>

          {me ? (
            <p className="desc">Welcome back {me.name}!</p>
          ) : (
            <Button redirect="/sign-in?next=/guestbook" width={120}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
