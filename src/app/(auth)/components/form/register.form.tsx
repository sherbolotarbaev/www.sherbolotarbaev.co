'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

import OAuthButtons from 'components/button/oauth-buttons';
import Link from 'next/link';
import Logo from '../logo';

import styles from './styles.module.scss';

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  return (
    <form className={styles.form}>
      <div className={clsx('container', styles.container)}>
        <div className={clsx('text', styles.text)}>
          <Logo />

          <h2 className="title">Create an account</h2>

          <p className="desc">
            Welcome! You can create an account using a Google or GitHub.
          </p>
        </div>

        <div className={styles.content_container}>
          <OAuthButtons />
        </div>

        <div className={clsx('text', styles.text)}>
          <p className="desc">
            Already have an account?
            <Link
              className="link"
              href={next !== '/' ? `/sign-in?next=${next}` : '/sign-in'}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
export default RegisterForm;
