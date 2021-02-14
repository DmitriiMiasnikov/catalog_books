import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import logout from './../../assets/Images/logout.svg';
import userinfo from './../../assets/Images/userinfo.svg';
import LoginBlock from '../LoginBlock/LoginBlock';
import classnames from 'classnames';
import angle from './../../assets/Images/angle.svg';

export const UserMenuDom = ({ myUserInfo, openUserInfo, isAuth, leftUser, isMobile, 
  showLoginBlockHandler, showLoginBlockMobile }) => {
  return (
    <div className={styles.wrapper}>
      {
        !isAuth ? (<>
          {
            isMobile && <div className={styles.loginBlockMobile}>
              <div className={classnames(styles.buttonShowInputs, {[styles.active]: showLoginBlockMobile})} onClick={() => showLoginBlockHandler()}>
                <span>авторизация/регистрация</span><img src={angle} className={classnames(styles.angle, {
                    [styles.reverse]: showLoginBlockMobile
                  })} alt='' />
            </div>
              {showLoginBlockMobile && <LoginBlock />}
            </div>
          }
          { !isMobile && <LoginBlock />}
        </>
        ) : myUserInfo &&
          <div className={styles.wrapperInfoUser}>
            <div className={styles.nameBlock}>Имя:
                <NavLink to={`/users/${myUserInfo.userId}`}>
                <span className={styles.name} onClick={() => openUserInfo(myUserInfo.userId)}>
                  {myUserInfo.userName}
                </span>
              </NavLink>
            </div>
            <div className={styles.title}>Аниме</div>
            <div className={styles.line}><span>просмотрено:</span> <span>{myUserInfo.animation.done.length}</span></div>
            <div className={styles.line}><span>в очереди:</span> <span>{myUserInfo.animation.queue.length}</span> </div>
            <div className={styles.buttons}>
              <NavLink to={`/users/${myUserInfo.userId}`}>
                <div className={styles.button} onClick={() => openUserInfo(myUserInfo.userId)}>
                  <img src={userinfo} alt='' />
                  <div className={styles.text}>
                    пользователь
                </div>
                </div>
              </NavLink>
              <div className={styles.button} onClick={() => leftUser()}>
                <img src={logout} alt='' />
                <div className={styles.text}>
                  выход
                </div>
              </div>
            </div>
          </div>
      }

    </div>
  )
}