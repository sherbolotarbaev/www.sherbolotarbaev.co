'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useNewGuestbookMessageMutation } from '@/redux/api/guestbook';
import { toast } from 'sonner';

import Input from 'components/input';

import styles from './styles.module.scss';

type FormData = {
  message: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  const [newGuestbookMessage, { isLoading }] = useNewGuestbookMessageMutation();

  const handleErrorAlert = (message?: string) => {
    toast.error(message || 'Try again. Something happened on our end', {
      position: 'bottom-right',
      duration: 5000,
    });
  };

  const handleSubmitForm: SubmitHandler<FormData> = async ({ message }) => {
    try {
      await newGuestbookMessage({ message }).unwrap();
    } catch (error: any) {
      handleErrorAlert(error.response.message);
    } finally {
      setValue('message', '');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.container}>
        <Input
          label="Message"
          placeholder="Your message..."
          error={errors.message && errors.message.message}
          load={isLoading}
          register={register('message', {
            required: 'This field is required',
          })}
        />
      </div>
    </form>
  );
};
export default Form;
