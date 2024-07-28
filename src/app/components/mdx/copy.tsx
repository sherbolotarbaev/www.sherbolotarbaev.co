'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { BiCheck, BiCopy } from 'react-icons/bi';
import styles from './styles.module.scss';

interface CopyProps {
  content: string;
}

const Copy: React.FC<CopyProps> = ({ content }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = () => {
    setCopied(true);
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!', {
      duration: 4500,
      position: 'bottom-right',
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  return !copied ? (
    <BiCopy className={styles.copy} onClick={copy} />
  ) : (
    <BiCheck className={styles.copy} onClick={copy} />
  );
};
export default Copy;
