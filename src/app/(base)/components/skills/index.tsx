'use client';

import React from 'react';

import Link from 'next/link';

import { skills as items } from '~/content/home';
import styles from './styles.module.scss';

const Skills = () => {
  return (
    <div className={styles.skills}>
      {React.Children.toArray(
        items.map(({ name, href, iconColor, ...props }) => (
          <Link className={styles.skill} href={href} target="_blank">
            <props.icon color={iconColor} size={20} />
            {name}
          </Link>
        )),
      )}
    </div>
  );
};
export default Skills;
