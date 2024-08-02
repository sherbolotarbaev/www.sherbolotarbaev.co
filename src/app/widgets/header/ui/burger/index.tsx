'use client';

import { useMenu } from 'providers/menu';

import { GrClose } from 'react-icons/gr';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './styles.module.scss';

const Burger = () => {
  const { toggle, isOpen } = useMenu();

  return (
    <span className={styles.burger} onClick={toggle}>
      {isOpen ? <GrClose size={20} /> : <RxHamburgerMenu size={25} />}
    </span>
  );
};
export default Burger;
