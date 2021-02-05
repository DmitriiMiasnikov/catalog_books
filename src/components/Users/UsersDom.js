import React from 'react';
import styles from './Users.module.scss';

export const UsersDom = ({ usersList }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.usersWrapper}>
      {
        usersList && usersList.map((el, i) => {
          return (
            <div className={styles.user} key={i}>
              {el.userName}
            </div>
          )
        })
      }
      </div>
    </div>
  )
}