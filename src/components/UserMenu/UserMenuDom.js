import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.scss';

export const UserMenuDom = ({ myUserInfo, openUserInfo }) => {
  return (
    <div>
      {myUserInfo &&
        <div className={styles.wrapper}>
          <div className={styles.nameBlock}>Имя:
            <NavLink to={`/users/${myUserInfo.userId}`}>
              <span className={styles.name} onClick={() => openUserInfo(myUserInfo.userId)}>
                {myUserInfo.userName}
              </span>
            </NavLink>
          </div>
          <div className={styles.books}>Книг прочитано: {myUserInfo.books.done.length} </div>
          <div className={styles.books}>Книг к прочтению: {myUserInfo.books.queue.length} </div>
          <div className={styles.books}>Аниме просмотрено: {myUserInfo.animation.done.length} </div>
          <div className={styles.books}>Аниме в очереди: {myUserInfo.animation.queue.length} </div>
          <div className={styles.buttons}>
            <NavLink to={`/users/${myUserInfo.userId}`}>
              <div className={styles.button} onClick={() => openUserInfo(myUserInfo.userId)}>
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