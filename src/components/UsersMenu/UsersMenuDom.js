import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UsersMenu.module.scss';

export const UsersMenuDom = ({ usersListMenu, stars, currentUserId }) => {
  return (
    <div className={styles.wrapper}>
      {
        Boolean(usersListMenu.length) ? usersListMenu.map((el, i) => {
          return (
            <div className={styles.user} key={i}>
              <div className={styles.number}>
                {i + 1}.
              </div>
              <div className={styles.name}>
                <NavLink to={`/users/${el.userId}`}>
                {el.userName} {currentUserId === el.userId && '(я)'}
                </NavLink>
              </div>
              <div className={styles.stars}>
                {stars[i]}
              </div>
            </div>
          )
        }) : <div className={styles.wrongLoad}>ошибка загрузки</div>
      }
    </div>
  )
}