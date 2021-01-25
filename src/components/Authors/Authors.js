import React from 'react';
import styles from './Authors.module.scss';

export const Authors = ({ authors }) => {
  return (
    <div className={styles.wrapper}>
            {
        authors.map((el, i) => {
          return (
            <div key={i} className={styles.author}>
              {el.name} - {el.country}
            </div>
          )
        })
      }
    </div>
  )
}