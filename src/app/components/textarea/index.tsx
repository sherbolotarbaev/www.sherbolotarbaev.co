'use client';

import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { geistSans } from 'shared/lib/fonts';
import styles from './styles.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  load?: boolean;
  error?: string;
  register?: UseFormRegisterReturn<any>;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  load,
  error,
  register,
  disabled,
  ...props
}) => {
  const className = clsx(
    'textarea-reset',
    styles.textarea,
    disabled && styles.disabled,
    error && !load && styles.error,
    load && styles.load,
  );

  return (
    <div className={styles.wrapper}>
      {!load && error ? (
        <span className={styles.error}>{error}</span>
      ) : (
        label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )
      )}

      <textarea
        className={className}
        disabled={load}
        style={geistSans.style}
        {...(register ? register : { name })}
        {...props}
      />
    </div>
  );
};
export default Textarea;
