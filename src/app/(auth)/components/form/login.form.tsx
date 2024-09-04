'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useLogInOtpMutation, useSendOtpMutation } from '@/redux/api/auth';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { getCookie, setCookie } from 'cookies-next';
import { toast } from 'sonner';

import Button from 'components/button';
import OAuthButtons from 'components/button/oauth-buttons';
import Input from 'components/input';
import Link from 'next/link';
import Logo from '../logo';

import { BiSolidRightArrow } from 'react-icons/bi';
import styles from './styles.module.scss';

type FormData = {
  email: string;
  otp: string;
};

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  const cookieEmail = getCookie('email');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });

  const [logIn, { isLoading }] = useLogInOtpMutation();
  const [sendOtp, { isLoading: isOtpSending }] = useSendOtpMutation();

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [continueWithEmail, setContinueWithEmail] = useState<boolean>(false);

  const otpInput = watch('otp');
  const emailInput = watch('email');

  const handleContinueWithEmail = async () => {
    setContinueWithEmail(true);
  };

  const handleClearInput = (name: keyof FormData) => {
    if (name === 'otp') {
      setIsOtpSent(false);
      setValue('otp', '');
    }

    setValue(name, '');
  };

  const checkIsOtpValid = useCallback(
    () => otpInput && isOtpSent && otpInput.length === 6 && /^\d+$/.test(otpInput),
    [otpInput, isOtpSent],
  );

  const handleSendOtp = () => {
    toast.promise(sendOtp({ email: emailInput }).unwrap(), {
      position: 'top-center',
      loading: 'Sending...',
      success: () => {
        setIsOtpSent(true);
        handleContinueWithEmail();
        return 'Verification code sent successfully';
      },
      error: (error) => {
        return error.data?.message || 'Try again. Something happened on our end.';
      },
    });
  };

  const handleLogInOtp = () => {
    toast.promise(logIn({ email: emailInput, otp: otpInput, next }).unwrap(), {
      position: 'top-center',
      loading: 'Verifying...',
      success: ({ redirectUrl, email }: LogInOtpResponse) => {
        setSuccess(true);
        setCookie('email', email);
        router.push(`/redirect?to=${redirectUrl}`);
        return `Successful sign in as ${email}`;
      },
      error: (error) => {
        return error.data?.message || 'Try again. Something happened on our end.';
      },
    });
  };

  const handleSubmitForm: SubmitHandler<FormData> = () => {
    handleSendOtp();
  };

  const resendOtp = async () => {
    setIsOtpSent(false);
    handleClearInput('otp');
    handleSendOtp();
  };

  useEffect(() => {
    if (cookieEmail) setValue('email', cookieEmail);
    if (checkIsOtpValid()) handleLogInOtp();
  }, [checkIsOtpValid]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={clsx('container', styles.container)}>
        <div className={clsx('text', styles.text)}>
          <Logo />

          <h2 className="title">Sign in to sherbolotarbaev.co</h2>

          <p className="desc">Welcome back! Please sign in to continue.</p>
        </div>

        <div className={styles.content_container}>
          {!continueWithEmail && (
            <>
              <OAuthButtons />

              <div className={styles.divider}>
                <hr />
                <span>or</span>
                <hr />
              </div>
            </>
          )}

          <Input
            label="Email"
            placeholder="Enter your email"
            error={errors.email && errors.email.message}
            load={isOtpSending || isLoading}
            disabled={isOtpSending || isLoading || success}
            autoComplete="email"
            register={register('email', {
              required: 'Please enter your email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email',
              },
              onChange: () => handleClearInput('otp'),
            })}
          />

          {isOtpSent ? (
            <>
              <Input
                label="6-digit verification code"
                placeholder="Paste verification code"
                error={errors.otp && errors.otp.message}
                load={isLoading}
                disabled={isLoading || success}
                register={register('otp', {
                  required: '6-digit verification code required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter only numbers',
                  },
                  minLength: {
                    value: 6,
                    message: '6-digit verification code required',
                  },
                  maxLength: {
                    value: 6,
                    message: '6-digit verification code required',
                  },
                })}
              />

              <div className={clsx('text', styles.text)}>
                <p className="desc">
                  We sent a code to your inbox.
                  <span className="link" onClick={resendOtp}>
                    Resend code
                  </span>
                </p>
              </div>
            </>
          ) : (
            <Button
              theme="white"
              load={isOtpSending}
              disabled={isOtpSending || success || !isValid}
            >
              Continue <BiSolidRightArrow size={8} />
            </Button>
          )}
        </div>

        {!isOtpSent && (
          <div className={clsx('text', styles.text)}>
            <p className="desc">
              {"Don't have an account?"}
              <Link
                className="link"
                href={next !== '/' ? `/sign-up?next=${next}` : '/sign-up'}
              >
                Sign Up
              </Link>
            </p>
          </div>
        )}
      </div>
    </form>
  );
};
export default LoginForm;
