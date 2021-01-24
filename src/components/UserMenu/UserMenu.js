import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.scss';

export const UserMenu = ({ currentUserInfo, openUserInfo }) => {
  return (
    <div>
      {currentUserInfo &&
        <div className={styles.wrapper}>
          <div>Имя: <span className={styles.name}>{currentUserInfo.userName}</span></div>
          <div className={styles.books}>Книг прочитано: {currentUserInfo.booksRead.length} </div>
          <div className={styles.books}>Книг к прочтению: {currentUserInfo.booksToRead.length} </div>
          <div className={styles.buttons}>
            <NavLink to={`/users/${currentUserInfo.userId}`}>
              <div className={styles.button} onClick={() => openUserInfo(currentUserInfo.userId)}>
                профиль
              </div>
            </NavLink>
            <div className={styles.button}>
              выйти
            </div>
          </div>
        </div>
      }
    </div>
  )
}