import React from 'react';
import styles from './UserMenu.module.scss';

export const UserMenu = ({ currentUserInfo }) => {
  return (
    <div>
      {currentUserInfo &&
        <div className={styles.wrapper}>
          <div>Имя: <span className={styles.name}>{currentUserInfo.userName}</span></div>
          <div className={styles.books}>Книг прочитано: {currentUserInfo.booksRead.length} </div>
          <div className={styles.books}>Книг к прочтению: {currentUserInfo.booksToRead.length} </div>
          <div className={styles.buttons}>
            <div className={styles.button}>
              профиль
            </div>
            <div className={styles.button}>
              выйти
            </div>
          </div>
        </div>
      }


    </div>
  )
}