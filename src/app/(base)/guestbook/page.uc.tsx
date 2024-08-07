'use client';

import clsx from 'clsx';

import Button from 'components/button';
import Form from './components/form';
import Messages from './components/messages';

import styles from './styles.module.scss';

interface GuestbookClientProps {
  me?: User | undefined;
}

export default function GuestbookClient({ me }: Readonly<GuestbookClientProps>) {
  return (
    <>
      <div className={clsx('wrapper', styles.wrapper)}>
        <div className={clsx('container', styles.container)}>
          <h2 className="title">sign my guestbook</h2>

          {me ? (
            <Form />
          ) : (
            <>
              <div className="text">
                <p className="desc">
                  Share your feedback, questions, collaborations, or just say hi. I am
                  eager to hear from you. Sign in to leave your message!
                </p>
              </div>

              <Button
                redirect={`${process.env.NEXT_PUBLIC_AUTH_URL}/sign-in?next=/guestbook`}
                width={120}
              >
                Sign in
              </Button>
            </>
          )}

          <Messages />
        </div>
      </div>
    </>
  );
}
