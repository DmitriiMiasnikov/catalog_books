import React from 'react';
import styles from './Books.module.scss';

export const Books = ({ books }) => {
  return (
    <div className={styles.wrapper}>
      {
        books.map((el, i) => {
          return (
            <div key={i} className={styles.book}>
              {el.name} - {el.autor}
            </div>
          )
        })
      }
    </div>
  )
}