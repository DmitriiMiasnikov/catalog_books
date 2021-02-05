import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UsersMenu.module.scss';

export const UsersMenuDom = ({ usersListMenu, stars }) => {
  console.log(usersListMenu);
  return (
    <div className={styles.wrapper}>
      {
        Boolean(usersListMenu.length) && usersListMenu.map((el, i) => {
          return (
            <div className={styles.user} key={i}>
              <div className={styles.number}>
                {i + 1}.
              </div>
              <div className={styles.name}>
                <NavLink to={`/users/${el.userId}`}>
                {el.userName}
                </NavLink>
              </div>
              <div className={styles.stars}>
                {stars[i]}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}