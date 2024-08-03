'use client';

import React from 'react';

import Icon from 'components/icon';
import Link from 'next/link';

import { skills as items } from '~/content/home';
import styles from './styles.module.scss';

const Skills = () => {
  return (
    <div className={styles.skills}>
      {React.Children.toArray(
        items.map(({ name, href, iconName, iconColor }) => (
          <Link className={styles.skill} href={href} target="_blank">
            {<Icon size={18} name={iconName} color={iconColor} module="si" />} {name}
          </Link>
        )),
      )}
    </div>
  );
};
export default Skills;
