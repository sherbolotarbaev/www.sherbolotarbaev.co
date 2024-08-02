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
        items.map((skill) => (
          <Link href={skill.href} className={styles.skill}>
            {<Icon size={18} name={skill.iconName} module="si" />} {skill.name}
          </Link>
        )),
      )}
    </div>
  );
};
export default Skills;
