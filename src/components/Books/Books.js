import React from 'react';
import styles from './Books.module.scss';

export const Books = ({ books, authors }) => {
  return (
    <div className={styles.wrapper}>
      {
        books.map((el, i) => {
          return (
            <div key={i} className={styles.book}>
              {el.name} - {authors.find(item => item.authorId === el.authorId).name}
            </div>
          )
        })
      }
    </div>
  )
}