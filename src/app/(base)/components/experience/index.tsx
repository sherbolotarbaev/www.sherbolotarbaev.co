'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { BiLink } from 'react-icons/bi';
import { jobs as items } from '~/content/home';
import styles from './styles.module.scss';

const Experience = () => {
  return (
    <div className={styles.experience}>
      {React.Children.toArray(
        items.map(({ name, date, role, description, url }) => (
          <div className={styles.job}>
            <div className={styles.head}>
              <h2 className="title">{name}</h2>

              <h3 className={clsx('subtitle', styles.date)}>{date}</h3>
            </div>

            <div className={clsx('text', styles.text)}>
              <h3 className={clsx('subtitle', styles.role)}>{role} • Full-time</h3>

              <p
                className={styles.desc}
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <Link className={clsx('link', styles.link)} href={url} target="_blank">
                <BiLink size={19} /> {url}
              </Link>
            </div>
          </div>
        )),
      )}
    </div>
  );
};
export default Experience;
