'use client';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { useSendContactMessageMutation } from '@/redux/api/contact';
import { useGetMeQuery } from '@/redux/api/me';

import Button from 'components/button';
import Input from 'components/input';
import Textarea from 'components/textarea';
import styles from './styles.module.scss';

type FormData = {
  name: string;
  email: string;
  message: string;
};

interface FormProps {
  handleCloseModal: () => void;
}

const Form: React.FC<FormProps> = ({ handleCloseModal }) => {
  const { data: me, isLoading: isGetMeLoading } = useGetMeQuery();

  const user = !isGetMeLoading && me ? me : null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const [newContactMessage, { isLoading }] = useSendContactMessageMutation();

  const notify = (message: string, type: 'success' | 'error') => {
    toast[type](message, {
      position: 'bottom-right',
      duration: 5000,
    });
  };

  const handleSubmitForm: SubmitHandler<FormData> = async ({ name, email, message }) => {
    if (!message.length) return;

    try {
      await newContactMessage({
        name: user ? user.name : name,
        email: user ? user.email : email,
        message,
      }).unwrap();
      ['name', 'email', 'message'].forEach((field) =>
        setValue(field as keyof FormData, ''),
      );
      handleCloseModal();
      notify('Successfully sent!', 'success');
    } catch (error: any) {
      notify(error.data?.message || 'Try again. Something happened on our end', 'error');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={clsx('text', styles.text)}>
        <h2 className="title">Get in touch ツ</h2>

        <p className="desc">
          Feel free to reach out to me with any questions or opportunities. I am always
          open to new challenges and collaborations 🙌🏻
        </p>
      </div>

      <div className={styles.container}>
        {!user && (
          <>
            <Input
              placeholder="Name"
              error={errors.name?.message}
              load={isLoading}
              register={register('name', {
                required: 'Please enter your name',
                maxLength: {
                  value: 64,
                  message: 'Maximum 64 characters allowed',
                },
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters allowed',
                },
                pattern: {
                  value: /^[a-zA-Zа-яА-Я]+$/,
                  message: 'Please enter a valid name, use letters only',
                },
              })}
            />

            <Input
              placeholder="Email"
              error={errors.email?.message}
              load={isLoading}
              register={register('email', {
                required: 'Please enter your email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email',
                },
              })}
            />
          </>
        )}

        <Textarea
          placeholder="Your message..."
          error={errors.message?.message}
          load={isLoading}
          register={register('message', {
            required: 'Please enter your message',
            maxLength: {
              value: 500,
              message: 'Maximum 500 characters allowed',
            },
          })}
        />
      </div>

      <Button theme="white" disabled>
        Submit
      </Button>
    </form>
  );
};
export default Form;
