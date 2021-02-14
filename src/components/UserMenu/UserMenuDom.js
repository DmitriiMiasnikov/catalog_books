import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import logout from './../../assets/Images/logout.svg';
import userinfo from './../../assets/Images/userinfo.svg';
import LoginBlock from '../LoginBlock/LoginBlock';
import classnames from 'classnames';
import angle from './../../assets/Images/angle.svg';
import registration from './../../assets/Images/registration.svg';

export const UserMenuDom = ({ myUserInfo, openUserInfo, isAuth, leftUser, isMobile,
  showLoginBlockHandler, showLoginBlockMobile, isMobileLess }) => {
    const refLoginMenu = useRef(null);
  const handleMouseClickLoginMenu = (e) => {
    if (!e.path.includes(refLoginMenu.current)) {
      showLoginBlockHandler(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleMouseClickLoginMenu, true)
    return () => document.removeEventListener('click', handleMouseClickLoginMenu, true)
  })
  return (
    <div className={styles.wrapper}>
      {
        !isAuth ? (<>
          {
            isMobile && <div className={styles.loginBlockMobile} ref={refLoginMenu}>
              <div className={classnames(styles.buttonShowInputs, { [styles.active]: showLoginBlockMobile })}
                onClick={() => showLoginBlockHandler()}>
                {isMobileLess ? <img src={registration} className={classnames(styles.registration, {
                  [styles.reverse]: showLoginBlockMobile
                })} alt='' /> : <span>авторизация/регистрация</span>}
                <img src={angle} className={classnames(styles.angle, { [styles.reverse]: showLoginBlockMobile })} alt='' />
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