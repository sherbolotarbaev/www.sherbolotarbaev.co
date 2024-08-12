'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { BiLoader } from 'react-icons/bi';
import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  load?: boolean;
  loadText?: string;
  redirect?: string;
  open?: string;
  theme?: Theme;
  small?: boolean;
  pulseAnimation?: boolean;
}

type Theme = 'blue' | 'red';

const Button: React.FC<ButtonProps> = ({
  children,
  width,
  load = false,
  loadText,
  redirect,
  open,
  theme,
  small = false,
  pulseAnimation = false,
  ...props
}) => {
  const router = useRouter();

  const className = clsx(
    'btn-reset',
    styles.button,
    load && styles.load,
    props.disabled && styles.disabled,
    theme && styles[theme],
    small && styles.small,
    pulseAnimation && styles.pulse_animation,
  );

  const style: React.CSSProperties = {
    ...props.style,
    ...(width && { maxWidth: `${width}px` }),
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (redirect) {
      router.push(redirect);
    } else if (open) {
      window.open(open, '_blank');
    }
    props.onClick && props.onClick(event);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      style={style}
      className={className}
      disabled={load || props.disabled}
    >
      {load ? (
        <>
          <BiLoader size={15} className={styles.loader} /> {loadText}
        </>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
