import React from 'react';
import styles from  './User.module.scss';

export const User = ({ currentUserInfo, selectedUserMine }) => {
  return (
    <div>
      {currentUserInfo && 
      <div className={styles.wrapper}>
        <div className={styles.name}>{currentUserInfo.userName} {selectedUserMine && <span>(Мой профиль)</span>}</div>
        <div className={styles.books}>книжная полка:</div>
      </div>}
    </div>
  )
}