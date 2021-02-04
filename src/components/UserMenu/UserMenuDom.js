import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.scss';

export const UserMenuDom = ({ myUserInfo, openUserInfo, isAuth }) => {
  return (
    <div className={styles.wrapper}>
      {
        isAuth ? (
          <div className={styles.loginBlock}>
            <form>
              <input placeholder={'имя'} />
              <input placeholder={'пароль'} />
              <div className={styles.buttons}>
                <div className={styles.button}>
                  войти
                  </div>
                <NavLink to={`/registration`}>
                  <div className={styles.button}>
                    регистрация
                </div>
                </NavLink>
              </div>
            </form>
          </div>
        ) : myUserInfo &&
          <div className={styles.wrapperInfoUser}>
            <div className={styles.nameBlock}>Имя:
                <NavLink to={`/users/${myUserInfo.userId}`}>
                <span className={styles.name} onClick={() => openUserInfo(myUserInfo.userId)}>
                  {myUserInfo.userName}
                </span>
              </NavLink>
            </div>
            <div className={styles.title}>Книги</div>
            <div className={styles.line}>прочитано: {myUserInfo.books.done.length} </div>
            <div className={styles.line}>к прочтению: {myUserInfo.books.queue.length} </div>
            <div className={styles.title}>Аниме</div>
            <div className={styles.line}><span>просмотрено:</span> <span>{myUserInfo.animation.done.length}</span></div>
            <div className={styles.line}><span>в очереди:</span> <span>{myUserInfo.animation.queue.length}</span> </div>
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