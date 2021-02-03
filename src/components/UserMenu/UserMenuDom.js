import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.scss';

export const UserMenuDom = ({ userInfo, openUserInfo }) => {
  return (
    <div>
      {userInfo &&
        <div className={styles.wrapper}>
          <div className={styles.nameBlock}>Имя:
            <NavLink to={`/users/${userInfo.userId}`}>
              <span className={styles.name} onClick={() => openUserInfo(userInfo.userId)}>
                {userInfo.userName}
              </span>
            </NavLink>
          </div>
          <div className={styles.books}>Книг прочитано: {userInfo.books.done.length} </div>
          <div className={styles.books}>Книг к прочтению: {userInfo.books.queue.length} </div>
          <div className={styles.books}>Аниме просмотрено: {userInfo.animation.done.length} </div>
          <div className={styles.books}>Аниме в очереди: {userInfo.animation.queue.length} </div>
          <div className={styles.buttons}>
            <NavLink to={`/users/${userInfo.userId}`}>
              <div className={styles.button} onClick={() => openUserInfo(userInfo.userId)}>
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