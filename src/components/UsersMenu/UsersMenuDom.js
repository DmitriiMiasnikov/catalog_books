import React from 'react';
import styles from './UsersMenu.module.scss';

export const UsersMenuDom = ({ usersListMenu }) => {
  return (
    <div className={styles.wrapper}>
      {
        Boolean(usersListMenu.length) && usersListMenu.map((el, i) => {
          return (
            <div className={styles.user} key={i}>
              {el.userName}
            </div>
          )
        })
      }
    </div>
  )
}