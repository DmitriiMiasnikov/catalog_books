import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UsersMenu.module.scss';
import star from './../../assets/Images/star.svg';

export const UsersMenuDom = ({ usersListMenu, stars, currentUserId }) => {
  return (
    <div className={styles.wrapper}>
      {
        usersListMenu ? usersListMenu.map((el, i) => {
          return (
            <div className={styles.user} key={i}>
              <div className={styles.name}>
                <div className={styles.number}>
                  {i + 1}.
              </div>
                <NavLink to={`/users/${el.userId}`}>
                  {el.userName} {currentUserId === el.userId && '(я)'}
                </NavLink>
              </div>
              <div className={styles.stars}>
                {stars[i]}
                <img src={star} alt=''/>
              </div>
            </div>
          )
        }) : <div className={styles.wrongLoad}>ошибка загрузки</div>
      }
      <div className={styles.allUsersLink}>
        <NavLink to={'/users'}>
          все пользователи
        </NavLink>
      </div>
    </div>
  )
}