import React from 'react';
import styles from  './User.module.scss';

export const UserDom = ({ userInfo, selectedUserMine }) => {
  return (
    <div>
      {userInfo && 
      <div className={styles.wrapper}>
        <div className={styles.name}>{userInfo.userName} {selectedUserMine && <span>(Мой профиль)</span>}</div>
        <div className={styles.books}>книжная полка:</div>
        <div className={styles.animeTitle}>Аниме:</div>
        <div className={styles.animeWrap}>

        </div>
      </div>}
    </div>
  )
}