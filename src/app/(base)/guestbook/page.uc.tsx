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
          <h2 className="title">Sign my guestbook</h2>

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

              <Button theme="white" redirect="/sign-in?next=/guestbook" width={120}>
                Sign in
              </Button>
            </>
          )}

          <Messages me={me} />
        </div>
      </div>
    </>
  );
}
